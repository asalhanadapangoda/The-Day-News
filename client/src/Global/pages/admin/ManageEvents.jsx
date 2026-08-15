import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Video, Calendar, MapPin, Type, UploadCloud, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isUploading, setIsUploading] = useState(null); // stores index or 'hero-0', 'gallery-1', etc
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    eventDate: '',
    location: '',
    heroImages: ['', '', ''],
    videoUrl: '',
    galleryImages: Array(12).fill(''),
    status: 'draft',
    albumUrl: '',
    articleLink: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events/admin');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching admin events:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      tagline: '',
      eventDate: '',
      location: '',
      heroImages: ['', '', ''],
      videoUrl: '',
      galleryImages: Array(12).fill(''),
      status: 'draft',
      albumUrl: '',
      articleLink: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      metaImage: ''
    });
    setEditingEvent(null);
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        tagline: event.tagline || '',
        eventDate: format(new Date(event.eventDate), 'yyyy-MM-dd'),
        location: event.location,
        heroImages: [...event.heroImages, '', '', ''].slice(0, 3),
        videoUrl: event.videoUrl,
        galleryImages: [...event.galleryImages, ...Array(12).fill('')].slice(0, 12),
        status: event.status,
        albumUrl: event.albumUrl || '',
        articleLink: event.articleLink || '',
        metaTitle: event.metaTitle || '',
        metaDescription: event.metaDescription || '',
        metaKeywords: event.metaKeywords || '',
        metaImage: event.metaImage || ''
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (type, index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadKey = `${type}-${index}`;
    const fileFormData = new FormData();
    fileFormData.append('file', file);

    setIsUploading(uploadKey);
    try {
      const { data } = await api.post('/upload', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newArray = [...formData[type]];
      newArray[index] = data.url;
      setFormData({ ...formData, [type]: newArray });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed. Please try again.');
    } finally {
      setIsUploading(null);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size on client side (100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Video file is too large. Maximum size is 100MB.');
      return;
    }

    const fileFormData = new FormData();
    fileFormData.append('file', file);

    setIsUploading('video');
    try {
      const { data } = await api.post('/upload/video', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setFormData({ ...formData, videoUrl: data.url });
    } catch (error) {
      console.error('Video upload failed:', error);
      alert('Video upload failed. ' + (error.response?.data?.message || 'Please try again.'));
    } finally {
      setIsUploading(null);
    }
  };

  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    if (files.length > 12) {
      alert('You can only upload a maximum of 12 gallery images at once.');
      return;
    }

    const fileFormData = new FormData();
    files.forEach(file => fileFormData.append('files', file));

    setIsUploading('bulk-gallery');
    try {
      const { data } = await api.post('/upload/multiple', fileFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newGallery = [...formData.galleryImages];
      let urlIndex = 0;
      
      // Fill empty slots first
      for (let i = 0; i < 12 && urlIndex < data.urls.length; i++) {
        if (!newGallery[i] || newGallery[i].trim() === '') {
          newGallery[i] = data.urls[urlIndex];
          urlIndex++;
        }
      }
      
      // If we still have URLs, append them to the end (if space permits)
      // (This logic is already covered by the loop if we start from 0)
      
      setFormData({ ...formData, galleryImages: newGallery });
    } catch (error) {
      console.error('Bulk upload failed:', error);
      alert('Bulk image upload failed. Please try again.');
    } finally {
      setIsUploading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter empty image strings
    const filteredHeroImages = formData.heroImages.filter(img => img.trim() !== '');
    const filteredGalleryImages = formData.galleryImages.filter(img => img.trim() !== '');

    if (filteredHeroImages.length === 0 || filteredGalleryImages.length === 0) {
      alert('Please provide at least one hero image and one gallery image.');
      return;
    }

    const payload = {
      ...formData,
      heroImages: filteredHeroImages,
      galleryImages: filteredGalleryImages,
    };

    try {
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, payload);
      } else {
        await api.post('/events', payload);
      }
      fetchEvents();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      const serverErrBody = error.response?.data?.error;
      const serverMsg = error.response?.data?.message;
      const genericMsg = 'Check all required fields and image URLs.';
      
      alert(`Save Failed: ${serverErrBody || serverMsg || genericMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleArrayChange = (type, index, value) => {
    const array = [...formData[type]];
    array[index] = value;
    setFormData({ ...formData, [type]: array });
  };

  if (loading) return <div className="text-white text-center py-20">Loading events...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
           <h1 className="text-3xl font-black text-white italic uppercase tracking-widest flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              Events Management
           </h1>
           <p className="text-gray-500 text-sm mt-1">Manage global events, summits, and media celebrations.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Plus size={20} /> Create New Event
        </button>
      </div>

      <div className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-gray-400">
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Date & Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.map((event) => (
              <tr key={event._id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <img src={event.heroImages[0]} alt={event.title} className="w-14 h-14 rounded-lg object-cover border border-white/10" />
                    <div>
                      <div className="font-bold text-white text-base group-hover:text-primary transition-colors">{event.title}</div>
                      <div className="text-xs text-gray-500 italic mt-0.5 line-clamp-1 max-w-[250px]">{event.tagline}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <div className="text-sm font-medium text-gray-300 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {format(new Date(event.eventDate), 'MMM dd, yyyy')}</span>
                      <span className="flex items-center gap-1.5 text-gray-500"><MapPin size={12} /> {event.location}</span>
                   </div>
                </td>
                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    event.status === 'published' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-center">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => handleOpenModal(event)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Edit Event"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete Event"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && <div className="p-20 text-center text-gray-500 italic">No events created yet. Start by creating one!</div>}
      </div>

      {/* Modal for Creation/Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h2 className="text-2xl font-black text-white italic uppercase tracking-wider flex items-center gap-3">
                 {editingEvent ? <Edit className="text-primary" /> : <Plus className="text-primary" />}
                 {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white p-2">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Info Group */}
              <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Type size={14} /> Basic Information
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-2 font-bold">Event Title *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., IEEE Education Week 2026"
                      />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-2 font-bold">Status</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                    </div>
                 </div>
                 
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <label className="block text-[10px] uppercase tracking-wide text-gray-500 font-bold">Short Tagline *</label>
                       <span className={`text-[10px] font-bold ${formData.tagline.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                          {formData.tagline.length} / 500
                       </span>
                    </div>
                    <textarea 
                      required
                      rows={3}
                      className={`w-full bg-white/5 border rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm ${formData.tagline.length > 500 ? 'border-red-500' : 'border-white/10'}`}
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Enter a compelling description of the event..."
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-2 font-bold">Event Date *</label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-2 font-bold">Location *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Colombo, Sri Lanka"
                      />
                    </div>
                 </div>
              </div>

              {/* Media Group */}
              <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <ImageIcon size={14} /> Hero Media (Max 3 sliding photos)
                 </h3>
                 <div className="space-y-3">
                    {formData.heroImages.map((img, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                         <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input 
                                  type="text" 
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-10 text-white focus:outline-none focus:border-primary transition-all text-xs"
                                  value={img}
                                  placeholder={`Hero Image URL ${idx + 1}`}
                                  onChange={(e) => handleArrayChange('heroImages', idx, e.target.value)}
                                />
                                {isUploading === `heroImages-${idx}` && (
                                  <div className="absolute right-3 top-2.5 text-primary animate-spin">
                                    <Loader2 size={16} />
                                  </div>
                                )}
                            </div>
                            <label className={`cursor-pointer p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                               <UploadCloud size={16} className="text-gray-400" />
                               <input 
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => handleFileUpload('heroImages', idx, e)}
                                 disabled={!!isUploading}
                               />
                            </label>
                         </div>
                         {img && (
                           <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                             <img src={img} className="w-12 h-12 object-cover rounded-md border border-white/10" alt="Preview" />
                             <span className="text-[10px] text-gray-500 truncate italic">{img}</span>
                           </div>
                         )}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Video size={14} /> Highlight Reel (Video URL or Upload)
                 </h3>
                 <div className="flex gap-2 mb-6">
                    <div className="flex-1 relative">
                       <input 
                          type="text" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-10 text-white focus:outline-none focus:border-primary transition-all text-sm"
                          value={formData.videoUrl}
                          placeholder="YouTube or Video Direct URL (Optional)"
                          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                       />
                       {isUploading === 'video' && (
                         <div className="absolute right-4 top-4 text-primary animate-spin">
                           <Loader2 size={20} />
                         </div>
                       )}
                    </div>
                    <label className={`cursor-pointer p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center ${isUploading === 'video' ? 'opacity-50 pointer-events-none' : ''}`} title="Upload Video (Max 100MB)">
                       <UploadCloud size={20} className="text-gray-400" />
                       <input 
                         type="file" 
                         className="hidden" 
                         accept="video/*"
                         onChange={handleVideoUpload}
                         disabled={!!isUploading}
                       />
                    </label>
                 </div>
                 {formData.videoUrl && formData.videoUrl.includes('cloudinary') && (
                   <div className="mt-2 text-xs text-green-500 flex items-center gap-2 mb-6">
                     <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                     Video uploaded successfully
                   </div>
                 )}

                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 mb-4">
                     <Plus size={14} /> Full Album Link (Optional) - "View All Photos" Button
                  </h3>
                  <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm"
                     value={formData.albumUrl}
                     placeholder="External Link (Google Photos, iCloud, etc.)"
                     onChange={(e) => setFormData({ ...formData, albumUrl: e.target.value })}
                  />

                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 mb-4 mt-6">
                     <Type size={14} /> Read Event Article Link (Optional) - "Read Event Article" Button
                  </h3>
                  <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-all text-sm mb-6"
                     value={formData.articleLink}
                     placeholder="Link to the event article (e.g., /articles/event-summary or external link)"
                     onChange={(e) => setFormData({ ...formData, articleLink: e.target.value })}
                  />

                  {/* SEO Custom Meta Overrides (Optional) */}
                  <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                      <Type size={14} /> SEO & Social Meta (Optional Overrides)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-1 font-bold">Custom Meta Title</label>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder="Default: Uses Event Title"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-1 font-bold">Custom Meta Keywords</label>
                        <input
                          type="text"
                          value={formData.metaKeywords}
                          onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                          placeholder="event, summit, conference"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-1 font-bold">Custom Meta Description</label>
                        <textarea
                          rows="2"
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Default: Uses Tagline/Description"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs resize-none"
                        ></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-wide text-gray-500 mb-1 font-bold">Custom Social Meta Image URL</label>
                        <input
                          type="text"
                          value={formData.metaImage}
                          onChange={(e) => setFormData({ ...formData, metaImage: e.target.value })}
                          placeholder="Default: Uses First Hero Image"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                        />
                      </div>
                    </div>
                  </div>
               </div>

              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                       <ImageIcon size={14} /> Event Gallery (Max 12 photos)
                    </h3>
                    <label className={`bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-xs font-bold transition-all border border-primary/20 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                       {isUploading === 'bulk-gallery' ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                       {isUploading === 'bulk-gallery' ? 'Uploading...' : 'Bulk Upload (Max 12)'}
                       <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleBulkUpload}
                          disabled={!!isUploading}
                       />
                    </label>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.galleryImages.map((img, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                         <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input 
                                  type="text" 
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-10 text-white focus:outline-none focus:border-primary transition-all text-xs"
                                  value={img}
                                  placeholder={`Gallery Image URL ${idx + 1}`}
                                  onChange={(e) => handleArrayChange('galleryImages', idx, e.target.value)}
                                />
                                {isUploading === `galleryImages-${idx}` && (
                                  <div className="absolute right-3 top-2.5 text-primary animate-spin">
                                    <Loader2 size={16} />
                                  </div>
                                )}
                            </div>
                            <label className={`cursor-pointer p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                               <UploadCloud size={16} className="text-gray-400" />
                               <input 
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => handleFileUpload('galleryImages', idx, e)}
                                 disabled={!!isUploading}
                               />
                            </label>
                         </div>
                         {img && (
                           <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5 overflow-hidden">
                             <img src={img} className="w-8 h-8 object-cover rounded-md border border-white/10 flex-shrink-0" alt="Preview" />
                             <span className="text-[10px] text-gray-500 truncate italic">{img}</span>
                           </div>
                         )}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex gap-4">
                <button 
                  type="submit"
                  disabled={!!isUploading}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:gap-5 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} /> {editingEvent ? 'Update Event Data' : 'Create Published Event'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
