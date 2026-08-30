import dotenv from 'dotenv';

dotenv.config();

/**
 * Helper to strip HTML tags and normalize whitespace from rich text editor HTML
 */
const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Robust JSON extractor that extracts JSON object from raw response text
 */
const extractJson = (rawText) => {
  if (!rawText) throw new Error('Empty response text from AI');
  const clean = rawText.trim();

  // 1. Direct parse attempt
  try {
    return JSON.parse(clean);
  } catch (e) {
    // Continue
  }

  // 2. Strip Markdown code block if present (e.g. ```json { ... } ```)
  const codeBlockMatch = clean.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch (e) {
      // Continue
    }
  }

  // 3. Find outermost JSON object boundaries '{' and '}'
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const sliced = clean.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(sliced);
    } catch (err) {
      const sanitised = sliced
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');
      try {
        return JSON.parse(sanitised);
      } catch (err2) {
        // Continue
      }
    }
  }

  throw new Error(`Could not parse JSON from AI response.`);
};

/**
 * Intelligently truncate or trim text to max length without breaking words
 */
const trimToLength = (text, maxLength, addEllipsis = false) => {
  if (!text) return '';
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  
  const limit = addEllipsis ? maxLength - 3 : maxLength;
  let truncated = clean.substring(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > limit * 0.7) {
    truncated = truncated.substring(0, lastSpace);
  }
  return addEllipsis ? `${truncated.trim()}...` : truncated.trim();
};

/**
 * Call Google Gemini API using native fetch with structured JSON response
 */
const callGeminiApi = async (apiKey, prompt) => {
  const models = [
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.7-flash',
  ];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('No candidate content returned by Gemini');
      }

      const parsedJson = extractJson(candidateText);
      return parsedJson;
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini API] Model ${model} failed:`, err.message);
    }
  }

  throw lastError || new Error('All Gemini models failed');
};

/**
 * @desc    Generate Article Title, Excerpt, Custom Meta Title, Meta Description, Meta Keywords & Tags with Gemini AI
 * @route   POST /api/ai/generate-article-meta
 * @access  Private / Protected
 */
export const generateArticleMeta = async (req, res) => {
  try {
    const { content, category, existingTitle } = req.body;
    const cleanContent = stripHtml(content);

    if (!cleanContent || cleanContent.length < 30) {
      return res.status(400).json({
        message: 'Article content is too short. Please provide at least a paragraph of article body text to generate metadata.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        message: 'Gemini API key is not configured on the server.',
      });
    }

    const prompt = `You are a senior news editor and SEO specialist for "The Day News Global".
Analyze the article content and generate standard JSON metadata.

ARTICLE CONTENT:
"""
${cleanContent.substring(0, 5000)}
"""

${category ? `Category: ${category}` : ''}
${existingTitle ? `Current Working Title: ${existingTitle}` : ''}

TARGET SPECIFICATIONS:
- "title": A compelling, journalistic news headline. Target 50 to 80 characters in length.
- "excerpt": An engaging teaser summary for article preview cards. Target 140 to 155 characters in length.
- "metaTitle": An SEO-optimized title for Google search results. Target 50 to 60 characters in length.
- "metaDescription": An SEO meta description for search engine snippets. Target 100 to 150 characters in length.
- "metaKeywords": A comma-separated list of 6 to 10 trending, high-relevance search keywords matching the article topic.

FORMATTING RULES:
- Output clean, professional natural language text ONLY.
- DO NOT include character numbers, count annotations, parentheses counters, or markdown formatting inside values.
- Return ONLY a valid JSON object matching the requested fields.

JSON OUTPUT STRUCTURE:
{
  "title": "Clean headline text",
  "excerpt": "Clean excerpt summary text",
  "metaTitle": "Clean meta title text",
  "metaDescription": "Clean meta description text",
  "metaKeywords": "keyword 1, keyword 2, keyword 3, keyword 4"
}`;

    const aiData = await callGeminiApi(apiKey, prompt);

    // Ensure strict bounds compliance
    let finalTitle = aiData.title ? String(aiData.title).trim() : '';
    if (finalTitle.length > 80) {
      finalTitle = trimToLength(finalTitle, 80);
    }

    let finalExcerpt = aiData.excerpt ? String(aiData.excerpt).trim() : '';
    if (finalExcerpt.length > 155) {
      finalExcerpt = trimToLength(finalExcerpt, 155);
    }

    let finalMetaTitle = aiData.metaTitle ? String(aiData.metaTitle).trim() : '';
    if (finalMetaTitle.length > 60) {
      finalMetaTitle = trimToLength(finalMetaTitle, 60);
    }

    let finalMetaDescription = aiData.metaDescription ? String(aiData.metaDescription).trim() : '';
    if (finalMetaDescription.length > 150) {
      finalMetaDescription = trimToLength(finalMetaDescription, 150);
    }

    let finalKeywords = aiData.metaKeywords ? String(aiData.metaKeywords).trim() : '';

    return res.status(200).json({
      success: true,
      data: {
        title: finalTitle,
        excerpt: finalExcerpt,
        metaTitle: finalMetaTitle,
        metaDescription: finalMetaDescription,
        metaKeywords: finalKeywords,
        characterCounts: {
          title: finalTitle.length,
          excerpt: finalExcerpt.length,
          metaTitle: finalMetaTitle.length,
          metaDescription: finalMetaDescription.length,
        },
      },
    });
  } catch (error) {
    console.error('AI Article Meta Generation Error:', error);
    return res.status(500).json({
      message: 'Failed to generate article metadata with Gemini AI.',
      error: error.message,
    });
  }
};
