import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FileText, Layers, Image as ImageIcon, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, colorClass, link }) => (
  <div className="bg-[#121212] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <Link to={link} className="text-xs text-primary hover:text-white transition-colors flex items-center gap-1 font-semibold uppercase">
      View Manage <span aria-hidden="true">&rarr;</span>
    </Link>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    heroes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articles, categories, heroes] = await Promise.all([
          api.get('/articles'),
          api.get('/categories'),
          api.get('/heroes')
        ]);

        setStats({
          articles: articles.data.length || 0,
          categories: categories.data.length || 0,
          heroes: heroes.data.length || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Th Dashboard</h1>
          <p className="text-gray-400">Portal overview and statistics for Thailand.</p>
        </div>
        <Link to="/Thailand/TDNG_Admin/articles" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
          <Plus size={18} /> New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Articles"
          value={stats.articles}
          icon={FileText}
          colorClass="bg-blue-600"
          link="/Thailand/TDNG_Admin/articles"
        />
        <StatCard
          title="Article Categories"
          value={stats.categories}
          icon={Layers}
          colorClass="bg-emerald-600"
          link="/Thailand/TDNG_Admin/categories"
        />
        <StatCard
          title="Hero Sliders"
          value={stats.heroes}
          icon={ImageIcon}
          colorClass="bg-amber-600"
          link="/Thailand/TDNG_Admin/heroes"
        />
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white mb-4">Thailand Portal Quick Guide</h2>
        <div className="space-y-4 text-gray-400">
          <p><span className="text-primary font-bold">1. Articles & Categories:</span> Create your required Categories prior to writing Articles, as every Article requires one.</p>
          <p><span className="text-primary font-bold">2. Hero Sliders:</span> Use high-resolution images for the homepage slider to ensure a premium visual experience for Thailand visitors.</p>
          <p><span className="text-primary font-bold">3. Image Uploads:</span> All media is optimized and hosted via Cloudinary for maximum performance across Thailand.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
