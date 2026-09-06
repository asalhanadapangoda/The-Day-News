import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Pencil, Trash2, Plus, X, UploadCloud, Search, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import ReactQuill from '../../components/LazyQuill';

const COUNTRIES = [
  'Sri Lanka',
  'Japan',
  'Australia',
  'Bangladesh',
  'Thailand',
  'India',
  'USA',
  'Denmark',
  'South Africa',
  'New Zealand',
  'Samoa',
];

/**
 * Reusable Character Count Badge (shows only character count)
 */
const CharBadge = ({ count, min, max }) => {
  const isOptimal = min && max ? count >= min && count <= max : true;
  const isOver = max ? count > max : false;
  const isUnder = min ? count > 0 && count < min : false;

  let colorClasses = "text-gray-400 bg-white/5 border-white/10";

  if (isOptimal && count > 0) {
    colorClasses = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
  } else if (isOver) {
    colorClasses = "text-rose-400 bg-rose-500/10 border-rose-500/30";
  } else if (isUnder) {
    colorClasses = "text-amber-400 bg-amber-500/10 border-amber-500/30";
  }

  return (
    <span className={`inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border transition-all ${colorClasses}`}>
      {count} characters
    </span>
  );
};

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState(null);

  // React Quill Content State
  const [editorContent, setEditorContent] = useState('');

  // Filters
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  const featuredImageUrl = watch('featuredImage');
  const watchedTitle = watch('title') || '';
  const watchedExcerpt = watch('excerpt') || '';
  const watchedMetaTitle = watch('metaTitle') || '';
  const watchedMetaDescription = watch('metaDescription') || '';

  const fetchData = async () => {
    try {
      setLoading(true);
      let queryParams = `?page=${page}&limit=20`;
      if (filterCategory) queryParams += `&category=${filterCategory}`;
      if (searchQuery) queryParams += `&search=${encodeURIComponent(searchQuery)}`;

      const [articlesRes, catsRes] = await Promise.all([
        api.get(`/articles${queryParams}`),
        api.get('/categories')
      ]);
      setArticles(articlesRes.data);
      setTotalPages(parseInt(articlesRes.headers['x-total-pages'], 10) || 1);
      setCategories(catsRes.data);
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, filterCategory, searchQuery]);

  const openAddModal = () => {
    setEditingId(null);
    reset({
      title: '',
      excerpt: '',
      featuredImage: '',
      author: 'Admin',
      tags: '',
      country: '',
      category: filterCategory || (categories.length > 0 ? categories[0]._id : ''),
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      metaImage: ''
    });
    setEditorContent('');
    setAiStatusMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (art) => {
    setEditingId(art._id);
    reset({
      title: art.title,
      excerpt: art.excerpt,
      featuredImage: art.featuredImage,
      author: art.author,
      tags: art.tags ? art.tags.join(', ') : '',
      country: art.country || '',
      category: art.category?._id || '',
      metaTitle: art.metaTitle || '',
      metaDescription: art.metaDescription || '',
      metaKeywords: art.metaKeywords || '',
      metaImage: art.metaImage || ''
    });
    setEditorContent(art.content);
    setAiStatusMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    reset();
    setEditorContent('');
    setAiStatusMessage(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setValue('featuredImage', data.url);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Gemini AI Auto-Generation for Title, Excerpt, Custom Meta Title, Meta Description, Meta Keywords & Tags
   */
  const handleAiGenerateMeta = async () => {
    // Strip HTML from editor content to check text presence
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorContent || '';
    const text = tempDiv.textContent || tempDiv.innerText || '';

    if (!text.trim() || text.trim().length < 30) {
      alert('Please write or paste the Article Body Content first before generating titles and SEO metadata.');
      return;
    }

    setIsGeneratingMeta(true);
    setAiStatusMessage(null);

    try {
      const selectedCategoryId = watch('category');
      const categoryObj = categories.find((c) => c._id === selectedCategoryId);
      const categoryName = categoryObj ? categoryObj.name : '';
      const currentTitle = watch('title') || '';

      const { data } = await api.post('/ai/generate-article-meta', {
        content: editorContent,
        category: categoryName,
        existingTitle: currentTitle,
      });

      if (data?.success && data?.data) {
        const { title, excerpt, metaTitle, metaDescription, metaKeywords } = data.data;

        if (title) setValue('title', title, { shouldValidate: true, shouldDirty: true });
        if (excerpt) setValue('excerpt', excerpt, { shouldValidate: true, shouldDirty: true });
        if (metaTitle) setValue('metaTitle', metaTitle, { shouldValidate: true, shouldDirty: true });
        if (metaDescription) setValue('metaDescription', metaDescription, { shouldValidate: true, shouldDirty: true });
        if (metaKeywords) setValue('metaKeywords', metaKeywords, { shouldValidate: true, shouldDirty: true });

        setAiStatusMessage('✨ Headline, Excerpt & SEO Metadata generated successfully!');
        setTimeout(() => setAiStatusMessage(null), 5000);
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      alert(error.response?.data?.message || 'Failed to auto-generate metadata.');
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  const onSubmit = async (data) => {
    if (!editorContent || editorContent === '<p><br></p>') {
      alert("Article content cannot be empty.");
      return;
    }

    const formattedData = {
      ...data,
      content: editorContent,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    try {
      if (editingId) {
        await api.put(`/articles/${editingId}`, formattedData);
      } else {
        await api.post('/articles', formattedData);
      }
      closeModal();
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this article definitively?")) {
      try {
        await api.delete(`/articles/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Articles</h1>
          <p className="text-gray-400">Written news and editorial features.</p>
        </div>
        <button onClick={openAddModal} className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium whitespace-nowrap">
          <Plus size={18} /> Write Article
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#121212] border border-white/5 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setPage(1);
            }}
            className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-primary [&>option]:bg-[#1a1a1a]"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search titles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#1a1a1a] text-gray-400 text-sm uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Status & Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles.map(art => (
              <tr key={art._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <img src={art.featuredImage} className="w-16 h-12 object-cover rounded" alt="thumb" />
                </td>
                <td className="px-6 py-4 text-white font-medium max-w-[250px] truncate" title={art.title}>{art.title}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {art.category ? (
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">{art.category.name}</span>
                  ) : 'Uncategorized'}
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm truncate max-w-[100px]">{art.author}</td>
                <td className="px-6 py-4">
                  <div className="text-white text-sm font-mono">{format(new Date(art.publishDate), 'MMM dd, yyy')}</div>
                  <div className="text-xs text-gray-500">{art.viewCount} views</div>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3 text-right">
                  <button onClick={() => openEditModal(art)} className="text-primary hover:text-white p-2 bg-primary/10 rounded-lg transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(art._id)} className="text-red-500 hover:text-white p-2 bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No articles found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-400">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-5xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#121212] flex-shrink-0">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Article' : 'Write Article'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            {aiStatusMessage && (
              <div className="bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-300 px-6 py-2.5 text-xs flex items-center justify-between animate-fadeIn">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  {aiStatusMessage}
                </span>
                <button type="button" onClick={() => setAiStatusMessage(null)} className="text-emerald-400 hover:text-white">
                  <X size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-grow flex flex-col">
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: Meta fields */}
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                    <select
                      {...register("category", { required: "Category is required" })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-primary focus:outline-none [&>option]:bg-[#1a1a1a]"
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
                    <input
                      {...register("author")}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Article Country</label>
                    <select
                      {...register("country")}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-primary focus:outline-none [&>option]:bg-[#1a1a1a]"
                    >
                      <option value="">Global / No Country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image URL *</label>
                    <div className="flex gap-2">
                      <input
                        {...register("featuredImage", { required: "Image is required" })}
                        className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        placeholder="https://..."
                      />
                      <label className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 text-sm rounded-lg cursor-pointer flex items-center justify-center border border-white/10 transition-colors">
                        <UploadCloud size={16} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                      </label>
                    </div>
                    <p className="text-gray-600 text-xs mt-1.5">📐 Recommended: <span className="text-primary/70">1200 × 630 px</span> (landscape) · Max 2MB · JPG or PNG</p>
                    {featuredImageUrl && (
                      <div className="mt-3 h-32 w-full rounded border border-white/10 overflow-hidden relative">
                        <img src={featuredImageUrl} className="w-full h-full object-cover" />
                      </div>
                    )}
                    {errors.featuredImage && <p className="text-red-400 text-xs mt-1">{errors.featuredImage.message}</p>}
                  </div>


                  {/* SEO Custom Meta Overrides */}
                  <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">SEO & Social Meta</h3>
                      <span className="text-[10px] text-gray-500 font-mono">SERP Optimized</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs text-gray-400">Custom Meta Title</label>
                        <CharBadge count={watchedMetaTitle.length} min={50} max={60} />
                      </div>
                      <input
                        {...register("metaTitle")}
                        placeholder="50-60 characters SERP title"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:border-primary focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs text-gray-400">Custom Meta Description</label>
                        <CharBadge count={watchedMetaDescription.length} min={100} max={150} />
                      </div>
                      <textarea
                        {...register("metaDescription")}
                        placeholder="100-150 characters search snippet..."
                        rows="3"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:border-primary focus:outline-none resize-none font-mono leading-relaxed"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">Custom Meta Keywords</label>
                      <input
                        {...register("metaKeywords")}
                        placeholder="trending, matching, keywords, comma, separated"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:border-primary focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Custom Social Meta Image URL</label>
                      <input
                        {...register("metaImage")}
                        placeholder="Default: Uses Featured Image URL"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Main Content */}
                <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-400">Article Title *</label>
                      <CharBadge count={watchedTitle.length} min={50} max={80} />
                    </div>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className="w-full bg-white/5 text-lg md:text-xl font-bold border border-white/10 text-white rounded-lg px-4 py-3 focus:border-primary focus:outline-none font-sans"
                      placeholder="Enter a compelling headline (50-80 characters)"
                    />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-400">Excerpt summary</label>
                      <CharBadge count={watchedExcerpt.length} min={140} max={155} />
                    </div>
                    <textarea
                      {...register("excerpt")}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-primary focus:outline-none resize-none text-sm leading-relaxed"
                      rows="2"
                      placeholder="A short engaging teaser for article cards (140-155 characters)..."
                    ></textarea>
                  </div>

                  {/* React Quill Editor Container with Gemini AI Generator Button */}
                  <div className="flex-grow flex flex-col pb-4 h-[440px]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <label className="block text-sm font-medium text-gray-400">Article Body Content *</label>

                      {/* AI Auto-Generate Button */}
                      <button
                        type="button"
                        onClick={handleAiGenerateMeta}
                        disabled={isGeneratingMeta}
                        title="Analyze article content and auto-generate Title, Excerpt, and SEO metadata"
                        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-md hover:shadow-indigo-500/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isGeneratingMeta ? (
                          <>
                            <Loader2 size={14} className="animate-spin text-white" />
                            <span>Generating metadata...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} className="text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
                            <span>✨ Auto-Generate Titles &amp; SEO</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-white text-black rounded-lg overflow-hidden flex-grow flex flex-col h-full editor-container">
                      <ReactQuill
                        theme="snow"
                        value={editorContent}
                        onChange={setEditorContent}
                        modules={modules}
                        className="flex-grow flex flex-col h-full pb-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-end gap-3 p-6 border-t border-white/10 bg-[#121212] mt-auto">
                <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-colors disabled:opacity-50">
                  {editingId ? 'Update' : 'Publish'} Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS override for Quill to look somewhat better in our modal bounds */}
      <style>{`
        .editor-container .ql-container {
          flex-grow: 1;
          font-family: inherit;
          font-size: 16px;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

export default ManageArticles;
