import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Pencil, Trash2, Plus, X, UploadCloud, Link as LinkIcon, Globe } from 'lucide-react';

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  
  const logoUrl = watch('logoUrl');

  const fetchPartners = async () => {
    try {
      const { data } = await api.get('/partners/admin');
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    reset({ name: '', logoUrl: '', websiteUrl: '', logoSize: '200x80', order: 0, isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (partner) => {
    setEditingId(partner._id);
    reset({ 
      name: partner.name, 
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl || '', 
      logoSize: partner.logoSize || '200x80',
      order: partner.order || 0,
      isActive: partner.isActive
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    reset();
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
      setValue('logoUrl', data.url);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await api.put(`/partners/${editingId}`, data);
      } else {
        await api.post('/partners', data);
      }
      closeModal();
      fetchPartners();
    } catch (error) {
      alert(error.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await api.delete(`/partners/${id}`);
        fetchPartners();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Partners</h1>
          <p className="text-gray-400">Manage the partner logos displayed on the homepage marquee.</p>
        </div>
        <button onClick={openAddModal} className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-lg hover:shadow-primary/20">
          <Plus size={18} /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.map(partner => (
          <div key={partner._id} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all flex flex-col group">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${partner.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-white font-bold truncate text-sm">{partner.name}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEditModal(partner)} className="text-gray-400 hover:text-primary p-1.5 transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(partner._id)} className="text-gray-400 hover:text-red-500 p-1.5 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex items-center justify-center bg-white/5 min-h-[140px]">
              <img 
                src={partner.logoUrl} 
                alt={partner.name} 
                className={`max-w-full max-h-20 object-contain transition-all ${partner.isActive ? 'grayscale-0' : 'grayscale'}`} 
              />
            </div>
            
            <div className="p-3 border-t border-white/5 flex justify-between items-center bg-black/10">
              <div className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-wider font-mono">
                Order: <span className="text-white">{partner.order}</span>
              </div>
              {partner.websiteUrl && (
                <a href={partner.websiteUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">
                  <Globe size={14} />
                </a>
              )}
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="col-span-full text-center py-20 bg-[#121212] rounded-xl border border-white/5 text-gray-500">
            No partners found. Add your first partner logo!
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#121212] flex-shrink-0">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Partner' : 'New Partner'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Partner Name *</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  placeholder="e.g. Acme Corp"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Website URL</label>
                <div className="flex bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-primary">
                  <div className="flex items-center px-3 text-gray-500 bg-white/5 border-r border-white/10">
                    <Globe size={16} />
                  </div>
                  <input 
                    {...register("websiteUrl")}
                    className="w-full bg-transparent text-white px-4 py-2 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Display Order</label>
                  <input 
                    type="number"
                    {...register("order")}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Mention Size</label>
                  <input 
                    {...register("logoSize")}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="200x80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Partner Logo *</label>
                <div className="flex gap-4">
                  <input 
                    {...register("logoUrl", { required: "Logo is required" })}
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="https://..."
                  />
                  <label className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 whitespace-nowrap border border-white/10 transition-colors">
                    <UploadCloud size={20} /> {isUploading ? 'Uploading...' : 'Upload'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                  </label>
                </div>
                <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">
                  <span className="text-primary/80 font-bold uppercase mr-2 italic">Pro Tip:</span>
                  Use transparent PNGs with a white/light logo for dark backgrounds. Recommended size: 200×80 px.
                </p>
                
                {logoUrl && (
                  <div className="mt-4 bg-white/5 p-4 rounded-xl border border-white/10 flex justify-center">
                    <img src={logoUrl} className="max-h-20 object-contain" alt="Preview" />
                  </div>
                )}
                {errors.logoUrl && <p className="text-red-400 text-xs mt-1">{errors.logoUrl.message}</p>}
              </div>

              <div className="mt-2 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" {...register("isActive")} className="sr-only" />
                    <div className="block bg-gray-600 w-10 h-6 rounded-full checkbox-bg transition-colors"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                  </div>
                  <div className="text-white text-sm font-medium group-hover:text-primary transition-colors">Visible on Homepage</div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-4">
                <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50">
                  {editingId ? 'Update Partner' : 'Save Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx="true">{`
        input:checked ~ .checkbox-bg {
          background-color: #ff0055;
        }
        input:checked ~ .dot {
          transform: translateX(100%);
        }
      `}</style>
    </div>
  );
};

export default ManagePartners;
