import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthProvider as BdAuthProvider } from './Bangladesh/context/AuthContext';
import { AuthProvider as AuAuthProvider } from './Australia/context/AuthContext';

// Layouts (Remain eager as they are small and used by almost everything)
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import BdPublicLayout from './Bangladesh/layouts/PublicLayout';
import BdAdminLayout from './Bangladesh/layouts/AdminLayout';
import AuPublicLayout from './Australia/layouts/PublicLayout';
import AuAdminLayout from './Australia/layouts/AdminLayout';

// Global Public Pages (Lazy)
const Home = lazy(() => import('./pages/Home'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));

// Global Admin Pages (Lazy)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManagePrograms = lazy(() => import('./pages/admin/ManagePrograms'));
const ManageEpisodes = lazy(() => import('./pages/admin/ManageEpisodes'));
const ManageArticles = lazy(() => import('./pages/admin/ManageArticles'));
const ManageCategories = lazy(() => import('./pages/admin/ManageCategories'));
const ManageAds = lazy(() => import('./pages/admin/ManageAds'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageSettings = lazy(() => import('./pages/admin/ManageSettings'));
const ManageHero = lazy(() => import('./pages/admin/ManageHero'));
const ManagePartners = lazy(() => import('./pages/admin/ManagePartners'));
const ManageEvents = lazy(() => import('./pages/admin/ManageEvents'));

// Bangladesh Public Pages (Lazy)
const BdHome = lazy(() => import('./Bangladesh/pages/Home'));
const BdPrograms = lazy(() => import('./Bangladesh/pages/Programs'));
const BdProgramDetail = lazy(() => import('./Bangladesh/pages/ProgramDetail'));
const BdArticles = lazy(() => import('./Bangladesh/pages/Articles'));
const BdArticleDetail = lazy(() => import('./Bangladesh/pages/ArticleDetail'));
const BdEvents = lazy(() => import('./Bangladesh/pages/Events'));
const BdEventDetail = lazy(() => import('./Bangladesh/pages/EventDetail'));
const BdAbout = lazy(() => import('./Bangladesh/pages/About'));
const BdContact = lazy(() => import('./Bangladesh/pages/Contact'));
const BdSearch = lazy(() => import('./Bangladesh/pages/Search'));

// Bangladesh Admin Pages (Lazy)
const BdAdminLogin = lazy(() => import('./Bangladesh/pages/admin/AdminLogin'));
const BdDashboard = lazy(() => import('./Bangladesh/pages/admin/Dashboard'));
const BdManagePrograms = lazy(() => import('./Bangladesh/pages/admin/ManagePrograms'));
const BdManageEpisodes = lazy(() => import('./Bangladesh/pages/admin/ManageEpisodes'));
const BdManageArticles = lazy(() => import('./Bangladesh/pages/admin/ManageArticles'));
const BdManageCategories = lazy(() => import('./Bangladesh/pages/admin/ManageCategories'));
const BdManageAds = lazy(() => import('./Bangladesh/pages/admin/ManageAds'));
const BdManageSettings = lazy(() => import('./Bangladesh/pages/admin/ManageSettings'));
const BdManageHero = lazy(() => import('./Bangladesh/pages/admin/ManageHero'));
const BdManagePartners = lazy(() => import('./Bangladesh/pages/admin/ManagePartners'));
const BdManageEvents = lazy(() => import('./Bangladesh/pages/admin/ManageEvents'));

// Australia Public Pages (Lazy)
const AuHome = lazy(() => import('./Australia/pages/Home'));
const AuPrograms = lazy(() => import('./Australia/pages/Programs'));
const AuProgramDetail = lazy(() => import('./Australia/pages/ProgramDetail'));
const AuArticles = lazy(() => import('./Australia/pages/Articles'));
const AuArticleDetail = lazy(() => import('./Australia/pages/ArticleDetail'));
const AuAbout = lazy(() => import('./Australia/pages/About'));
const AuContact = lazy(() => import('./Australia/pages/Contact'));
const AuSearch = lazy(() => import('./Australia/pages/Search'));

// Australia Admin Pages (Lazy)
const AuAdminLogin = lazy(() => import('./Australia/pages/admin/AdminLogin'));
const AuDashboard = lazy(() => import('./Australia/pages/admin/Dashboard'));
const AuManagePrograms = lazy(() => import('./Australia/pages/admin/ManagePrograms'));
const AuManageEpisodes = lazy(() => import('./Australia/pages/admin/ManageEpisodes'));
const AuManageArticles = lazy(() => import('./Australia/pages/admin/ManageArticles'));
const AuManageCategories = lazy(() => import('./Australia/pages/admin/ManageCategories'));
const AuManageHero = lazy(() => import('./Australia/pages/admin/ManageHero'));

function App() {
  return (
    <Suspense fallback={null}>
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

        {/* ── Bangladesh Public Routes ── */}
        <Route path="/Bangladesh" element={<BdAuthProvider><BdPublicLayout /></BdAuthProvider>}>
          <Route index element={<BdHome />} />
          <Route path="programs" element={<BdPrograms />} />
          <Route path="programs/:slug" element={<BdProgramDetail />} />
          <Route path="articles" element={<BdArticles />} />
          <Route path="articles/:slug" element={<BdArticleDetail />} />
          <Route path="events" element={<BdEvents />} />
          <Route path="events/:slug" element={<BdEventDetail />} />
          <Route path="about" element={<BdAbout />} />
          <Route path="contact" element={<BdContact />} />
          <Route path="search" element={<BdSearch />} />
        </Route>

        {/* ── Bangladesh Admin Routes ── */}
        <Route path="/Bangladesh/TDNG_Admin/login" element={<BdAuthProvider><BdAdminLogin /></BdAuthProvider>} />
        <Route path="/Bangladesh/TDNG_Admin" element={<BdAuthProvider><BdAdminLayout /></BdAuthProvider>}>
          <Route index element={<BdDashboard />} />
          <Route path="dashboard" element={<BdDashboard />} />
          <Route path="programs" element={<BdManagePrograms />} />
          <Route path="episodes" element={<BdManageEpisodes />} />
          <Route path="articles" element={<BdManageArticles />} />
          <Route path="categories" element={<BdManageCategories />} />
          <Route path="ads" element={<BdManageAds />} />
          <Route path="settings" element={<BdManageSettings />} />
          <Route path="heroes" element={<BdManageHero />} />
          <Route path="partners" element={<BdManagePartners />} />
          <Route path="events" element={<BdManageEvents />} />
        </Route>

        {/* ── Australia Public Routes ── */}
        <Route path="/Australia" element={<AuAuthProvider><AuPublicLayout /></AuAuthProvider>}>
          <Route index element={<AuHome />} />
          <Route path="programs" element={<AuPrograms />} />
          <Route path="programs/:slug" element={<AuProgramDetail />} />
          <Route path="articles" element={<AuArticles />} />
          <Route path="articles/:slug" element={<AuArticleDetail />} />
          <Route path="about" element={<AuAbout />} />
          <Route path="contact" element={<AuContact />} />
          <Route path="search" element={<AuSearch />} />
        </Route>

        {/* ── Australia Admin Routes ── */}
        <Route path="/Australia/TDNG_Admin/login" element={<AuAuthProvider><AuAdminLogin /></AuAuthProvider>} />
        <Route path="/Australia/TDNG_Admin" element={<AuAuthProvider><AuAdminLayout /></AuAuthProvider>}>
          <Route index element={<AuDashboard />} />
          <Route path="dashboard" element={<AuDashboard />} />
          <Route path="programs" element={<AuManagePrograms />} />
          <Route path="episodes" element={<AuManageEpisodes />} />
          <Route path="articles" element={<AuManageArticles />} />
          <Route path="categories" element={<AuManageCategories />} />
          <Route path="heroes" element={<AuManageHero />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
