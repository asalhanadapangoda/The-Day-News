import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://thedaynewsglobal.lk';

const getAccessToken = (clientEmail, privateKey) => {
  return new Promise((resolve, reject) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const payload = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp,
      iat,
    };

    // Sign the JWT assertion with RS256
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    const postData = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }).toString();

    fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => reject(new Error(`Token request failed: ${text}`)));
        }
        return res.json();
      })
      .then((data) => resolve(data.access_token))
      .catch(reject);
  });
};



/**
 * Send a notification to the Google Indexing API.
 * @param {string} slug - The article slug
 * @param {string} type - Either 'URL_UPDATED' (for publish/update) or 'URL_DELETED'
 */
export const pingGoogleIndexing = async (slug, type = 'URL_UPDATED') => {
  try {
    const keyPath = path.join(__dirname, '..', '..', 'google-key.json');
    if (!fs.existsSync(keyPath)) {
      console.warn('[Google Indexing] Credentials file not found at:', keyPath);
      return;
    }

    const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const { client_email, private_key } = credentials;

    if (!client_email || !private_key) {
      console.warn('[Google Indexing] Missing client_email or private_key in google-key.json');
      return;
    }

    const accessToken = await getAccessToken(client_email, private_key);

    // Build the absolute canonical URL
    const url = `${BASE_URL}/articles/${slug}`;

    console.log(`[Google Indexing] Sending ${type} request for: ${url}`);

    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        url,
        type,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error('[Google Indexing] API Error:', responseData);
    } else {
      console.log('[Google Indexing] Success:', responseData);
    }
  } catch (error) {
    console.error('[Google Indexing] Execution failed:', error);
  }
};
