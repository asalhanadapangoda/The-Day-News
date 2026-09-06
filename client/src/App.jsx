import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Global/context/AuthContext';
import ScrollToTop from './Global/components/ScrollToTop';

// Layouts (Remain eager as they are small and used by almost everything)
import PublicLayout from './Global/layouts/PublicLayout';
import AdminLayout from './Global/layouts/AdminLayout';

// Global Public Pages (Lazy)
const Home = lazy(() => import('./Global/pages/Home'));
const Programs = lazy(() => import('./Global/pages/Programs'));
const ProgramDetail = lazy(() => import('./Global/pages/ProgramDetail'));
const Articles = lazy(() => import('./Global/pages/Articles'));
const ArticleDetail = lazy(() => import('./Global/pages/ArticleDetail'));
const Events = lazy(() => import('./Global/pages/Events'));
const EventDetail = lazy(() => import('./Global/pages/EventDetail'));
const About = lazy(() => import('./Global/pages/About'));
const Contact = lazy(() => import('./Global/pages/Contact'));
const Search = lazy(() => import('./Global/pages/Search'));
const Packages = lazy(() => import('./Global/pages/Packages'));
const PrivacyPolicy = lazy(() => import('./Global/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./Global/pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./Global/pages/CookiePolicy'));

// Global Admin Pages (Lazy)
const AdminLogin = lazy(() => import('./Global/pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./Global/pages/admin/Dashboard'));
const ManagePrograms = lazy(() => import('./Global/pages/admin/ManagePrograms'));
const ManageEpisodes = lazy(() => import('./Global/pages/admin/ManageEpisodes'));
const ManageArticles = lazy(() => import('./Global/pages/admin/ManageArticles'));
const ManageCategories = lazy(() => import('./Global/pages/admin/ManageCategories'));
const ManageAds = lazy(() => import('./Global/pages/admin/ManageAds'));
const ManageMessages = lazy(() => import('./Global/pages/admin/ManageMessages'));
const ManageSettings = lazy(() => import('./Global/pages/admin/ManageSettings'));
const ManageHero = lazy(() => import('./Global/pages/admin/ManageHero'));
const ManagePartners = lazy(() => import('./Global/pages/admin/ManagePartners'));
const ManageEvents = lazy(() => import('./Global/pages/admin/ManageEvents'));

function App() {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Routes>
        {/* ── Global Public Routes ── */}
        <Route element={<AuthProvider><PublicLayout /></AuthProvider>}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Route>

        {/* ── Global Admin Routes ── */}
        <Route path="/admin/login" element={<AuthProvider><AdminLogin /></AuthProvider>} />
        <Route path="/admin" element={<AuthProvider><AdminLayout /></AuthProvider>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="programs" element={<ManagePrograms />} />
          <Route path="episodes" element={<ManageEpisodes />} />
          <Route path="articles" element={<ManageArticles />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="ads" element={<ManageAds />} />
          <Route path="messages" element={<ManageMessages />} />
          <Route path="settings" element={<ManageSettings />} />
          <Route path="heroes" element={<ManageHero />} />
          <Route path="partners" element={<ManagePartners />} />
          <Route path="events" element={<ManageEvents />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
