import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Global/context/AuthContext';
import { AuthProvider as BdAuthProvider } from './Country/Bangladesh/context/AuthContext';
import { AuthProvider as AuAuthProvider } from './Country/Australia/context/AuthContext';
import { AuthProvider as NzAuthProvider } from './Country/NewZealand/context/AuthContext';
import { AuthProvider as JpAuthProvider } from './Country/Japan/context/AuthContext';
import { AuthProvider as InAuthProvider } from './Country/India/context/AuthContext';
import { AuthProvider as UsAuthProvider } from './Country/USA/context/AuthContext';
import { AuthProvider as ThAuthProvider } from './Country/Thailand/context/AuthContext';
import { AuthProvider as DkAuthProvider } from './Country/Denmark/context/AuthContext';
import { AuthProvider as SmAuthProvider } from './Country/Samoa/context/AuthContext';
import { AuthProvider as ZaAuthProvider } from './Country/SouthAfrica/context/AuthContext';
import ScrollToTop from './Global/components/ScrollToTop';

// Layouts (Remain eager as they are small and used by almost everything)
import PublicLayout from './Global/layouts/PublicLayout';
import AdminLayout from './Global/layouts/AdminLayout';
import BdPublicLayout from './Country/Bangladesh/layouts/PublicLayout';
import BdAdminLayout from './Country/Bangladesh/layouts/AdminLayout';
import AuPublicLayout from './Country/Australia/layouts/PublicLayout';
import AuAdminLayout from './Country/Australia/layouts/AdminLayout';
import NzPublicLayout from './Country/NewZealand/layouts/PublicLayout';
import NzAdminLayout from './Country/NewZealand/layouts/AdminLayout';
import JpPublicLayout from './Country/Japan/layouts/PublicLayout';
import JpAdminLayout from './Country/Japan/layouts/AdminLayout';
import InPublicLayout from './Country/India/layouts/PublicLayout';
import InAdminLayout from './Country/India/layouts/AdminLayout';
import UsPublicLayout from './Country/USA/layouts/PublicLayout';
import UsAdminLayout from './Country/USA/layouts/AdminLayout';
import ThPublicLayout from './Country/Thailand/layouts/PublicLayout';
import ThAdminLayout from './Country/Thailand/layouts/AdminLayout';
import DkPublicLayout from './Country/Denmark/layouts/PublicLayout';
import DkAdminLayout from './Country/Denmark/layouts/AdminLayout';
import SmPublicLayout from './Country/Samoa/layouts/PublicLayout';
import SmAdminLayout from './Country/Samoa/layouts/AdminLayout';
import ZaPublicLayout from './Country/SouthAfrica/layouts/PublicLayout';
import ZaAdminLayout from './Country/SouthAfrica/layouts/AdminLayout';

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

// Bangladesh Public Pages (Lazy)
const BdHome = lazy(() => import('./Country/Bangladesh/pages/Home'));
const BdPrograms = lazy(() => import('./Country/Bangladesh/pages/Programs'));
const BdProgramDetail = lazy(() => import('./Country/Bangladesh/pages/ProgramDetail'));
const BdArticles = lazy(() => import('./Country/Bangladesh/pages/Articles'));
const BdArticleDetail = lazy(() => import('./Country/Bangladesh/pages/ArticleDetail'));
const BdEvents = lazy(() => import('./Country/Bangladesh/pages/Events'));
const BdEventDetail = lazy(() => import('./Country/Bangladesh/pages/EventDetail'));
const BdAbout = lazy(() => import('./Country/Bangladesh/pages/About'));
const BdContact = lazy(() => import('./Country/Bangladesh/pages/Contact'));
const BdSearch = lazy(() => import('./Country/Bangladesh/pages/Search'));

// Bangladesh Admin Pages (Lazy)
const BdAdminLogin = lazy(() => import('./Country/Bangladesh/pages/admin/AdminLogin'));
const BdDashboard = lazy(() => import('./Country/Bangladesh/pages/admin/Dashboard'));
const BdManagePrograms = lazy(() => import('./Country/Bangladesh/pages/admin/ManagePrograms'));
const BdManageEpisodes = lazy(() => import('./Country/Bangladesh/pages/admin/ManageEpisodes'));
const BdManageArticles = lazy(() => import('./Country/Bangladesh/pages/admin/ManageArticles'));
const BdManageCategories = lazy(() => import('./Country/Bangladesh/pages/admin/ManageCategories'));
const BdManageAds = lazy(() => import('./Country/Bangladesh/pages/admin/ManageAds'));
const BdManageSettings = lazy(() => import('./Country/Bangladesh/pages/admin/ManageSettings'));
const BdManageHero = lazy(() => import('./Country/Bangladesh/pages/admin/ManageHero'));
const BdManagePartners = lazy(() => import('./Country/Bangladesh/pages/admin/ManagePartners'));
const BdManageEvents = lazy(() => import('./Country/Bangladesh/pages/admin/ManageEvents'));

// Australia Public Pages (Lazy)
const AuHome = lazy(() => import('./Country/Australia/pages/Home'));
const AuPrograms = lazy(() => import('./Country/Australia/pages/Programs'));
const AuProgramDetail = lazy(() => import('./Country/Australia/pages/ProgramDetail'));
const AuArticles = lazy(() => import('./Country/Australia/pages/Articles'));
const AuArticleDetail = lazy(() => import('./Country/Australia/pages/ArticleDetail'));
const AuAbout = lazy(() => import('./Country/Australia/pages/About'));
const AuContact = lazy(() => import('./Country/Australia/pages/Contact'));
const AuSearch = lazy(() => import('./Country/Australia/pages/Search'));

// Australia Admin Pages (Lazy)
const AuAdminLogin = lazy(() => import('./Country/Australia/pages/admin/AdminLogin'));
const AuDashboard = lazy(() => import('./Country/Australia/pages/admin/Dashboard'));
const AuManagePrograms = lazy(() => import('./Country/Australia/pages/admin/ManagePrograms'));
const AuManageEpisodes = lazy(() => import('./Country/Australia/pages/admin/ManageEpisodes'));
const AuManageArticles = lazy(() => import('./Country/Australia/pages/admin/ManageArticles'));
const AuManageCategories = lazy(() => import('./Country/Australia/pages/admin/ManageCategories'));
const AuManageHero = lazy(() => import('./Country/Australia/pages/admin/ManageHero'));

// New Zealand Public Pages (Lazy)
const NzHome = lazy(() => import('./Country/NewZealand/pages/Home'));
const NzArticles = lazy(() => import('./Country/NewZealand/pages/Articles'));
const NzArticleDetail = lazy(() => import('./Country/NewZealand/pages/ArticleDetail'));
const NzAbout = lazy(() => import('./Country/NewZealand/pages/About'));
const NzContact = lazy(() => import('./Country/NewZealand/pages/Contact'));
const NzSearch = lazy(() => import('./Country/NewZealand/pages/Search'));

// New Zealand Admin Pages (Lazy)
const NzAdminLogin = lazy(() => import('./Country/NewZealand/pages/admin/AdminLogin'));
const NzDashboard = lazy(() => import('./Country/NewZealand/pages/admin/Dashboard'));
const NzManageArticles = lazy(() => import('./Country/NewZealand/pages/admin/ManageArticles'));
const NzManageCategories = lazy(() => import('./Country/NewZealand/pages/admin/ManageCategories'));
const NzManageHero = lazy(() => import('./Country/NewZealand/pages/admin/ManageHero'));

// Japan Pages (Lazy)
const JpHome = lazy(() => import('./Country/Japan/pages/Home'));
const JpArticles = lazy(() => import('./Country/Japan/pages/Articles'));
const JpArticleDetail = lazy(() => import('./Country/Japan/pages/ArticleDetail'));
const JpAbout = lazy(() => import('./Country/Japan/pages/About'));
const JpContact = lazy(() => import('./Country/Japan/pages/Contact'));
const JpSearch = lazy(() => import('./Country/Japan/pages/Search'));
const JpAdminLogin = lazy(() => import('./Country/Japan/pages/admin/AdminLogin'));
const JpDashboard = lazy(() => import('./Country/Japan/pages/admin/Dashboard'));
const JpManageArticles = lazy(() => import('./Country/Japan/pages/admin/ManageArticles'));
const JpManageCategories = lazy(() => import('./Country/Japan/pages/admin/ManageCategories'));
const JpManageHero = lazy(() => import('./Country/Japan/pages/admin/ManageHero'));

// India Pages (Lazy)
const InHome = lazy(() => import('./Country/India/pages/Home'));
const InArticles = lazy(() => import('./Country/India/pages/Articles'));
const InArticleDetail = lazy(() => import('./Country/India/pages/ArticleDetail'));
const InAbout = lazy(() => import('./Country/India/pages/About'));
const InContact = lazy(() => import('./Country/India/pages/Contact'));
const InSearch = lazy(() => import('./Country/India/pages/Search'));
const InAdminLogin = lazy(() => import('./Country/India/pages/admin/AdminLogin'));
const InDashboard = lazy(() => import('./Country/India/pages/admin/Dashboard'));
const InManageArticles = lazy(() => import('./Country/India/pages/admin/ManageArticles'));
const InManageCategories = lazy(() => import('./Country/India/pages/admin/ManageCategories'));
const InManageHero = lazy(() => import('./Country/India/pages/admin/ManageHero'));

// USA Pages (Lazy)
const UsHome = lazy(() => import('./Country/USA/pages/Home'));
const UsArticles = lazy(() => import('./Country/USA/pages/Articles'));
const UsArticleDetail = lazy(() => import('./Country/USA/pages/ArticleDetail'));
const UsAbout = lazy(() => import('./Country/USA/pages/About'));
const UsContact = lazy(() => import('./Country/USA/pages/Contact'));
const UsSearch = lazy(() => import('./Country/USA/pages/Search'));
const UsAdminLogin = lazy(() => import('./Country/USA/pages/admin/AdminLogin'));
const UsDashboard = lazy(() => import('./Country/USA/pages/admin/Dashboard'));
const UsManageArticles = lazy(() => import('./Country/USA/pages/admin/ManageArticles'));
const UsManageCategories = lazy(() => import('./Country/USA/pages/admin/ManageCategories'));
const UsManageHero = lazy(() => import('./Country/USA/pages/admin/ManageHero'));

// Thailand Pages (Lazy)
const ThHome = lazy(() => import('./Country/Thailand/pages/Home'));
const ThArticles = lazy(() => import('./Country/Thailand/pages/Articles'));
const ThArticleDetail = lazy(() => import('./Country/Thailand/pages/ArticleDetail'));
const ThAbout = lazy(() => import('./Country/Thailand/pages/About'));
const ThContact = lazy(() => import('./Country/Thailand/pages/Contact'));
const ThSearch = lazy(() => import('./Country/Thailand/pages/Search'));
const ThAdminLogin = lazy(() => import('./Country/Thailand/pages/admin/AdminLogin'));
const ThDashboard = lazy(() => import('./Country/Thailand/pages/admin/Dashboard'));
const ThManageArticles = lazy(() => import('./Country/Thailand/pages/admin/ManageArticles'));
const ThManageCategories = lazy(() => import('./Country/Thailand/pages/admin/ManageCategories'));
const ThManageHero = lazy(() => import('./Country/Thailand/pages/admin/ManageHero'));

// Denmark Pages (Lazy)
const DkHome = lazy(() => import('./Country/Denmark/pages/Home'));
const DkArticles = lazy(() => import('./Country/Denmark/pages/Articles'));
const DkArticleDetail = lazy(() => import('./Country/Denmark/pages/ArticleDetail'));
const DkAbout = lazy(() => import('./Country/Denmark/pages/About'));
const DkContact = lazy(() => import('./Country/Denmark/pages/Contact'));
const DkSearch = lazy(() => import('./Country/Denmark/pages/Search'));
const DkAdminLogin = lazy(() => import('./Country/Denmark/pages/admin/AdminLogin'));
const DkDashboard = lazy(() => import('./Country/Denmark/pages/admin/Dashboard'));
const DkManageArticles = lazy(() => import('./Country/Denmark/pages/admin/ManageArticles'));
const DkManageCategories = lazy(() => import('./Country/Denmark/pages/admin/ManageCategories'));
const DkManageHero = lazy(() => import('./Country/Denmark/pages/admin/ManageHero'));

// Samoa Pages (Lazy)
const SmHome = lazy(() => import('./Country/Samoa/pages/Home'));
const SmArticles = lazy(() => import('./Country/Samoa/pages/Articles'));
const SmArticleDetail = lazy(() => import('./Country/Samoa/pages/ArticleDetail'));
const SmAbout = lazy(() => import('./Country/Samoa/pages/About'));
const SmContact = lazy(() => import('./Country/Samoa/pages/Contact'));
const SmSearch = lazy(() => import('./Country/Samoa/pages/Search'));
const SmAdminLogin = lazy(() => import('./Country/Samoa/pages/admin/AdminLogin'));
const SmDashboard = lazy(() => import('./Country/Samoa/pages/admin/Dashboard'));
const SmManageArticles = lazy(() => import('./Country/Samoa/pages/admin/ManageArticles'));
const SmManageCategories = lazy(() => import('./Country/Samoa/pages/admin/ManageCategories'));
const SmManageHero = lazy(() => import('./Country/Samoa/pages/admin/ManageHero'));

// South Africa Pages (Lazy)
const ZaHome = lazy(() => import('./Country/SouthAfrica/pages/Home'));
const ZaArticles = lazy(() => import('./Country/SouthAfrica/pages/Articles'));
const ZaArticleDetail = lazy(() => import('./Country/SouthAfrica/pages/ArticleDetail'));
const ZaAbout = lazy(() => import('./Country/SouthAfrica/pages/About'));
const ZaContact = lazy(() => import('./Country/SouthAfrica/pages/Contact'));
const ZaSearch = lazy(() => import('./Country/SouthAfrica/pages/Search'));
const ZaAdminLogin = lazy(() => import('./Country/SouthAfrica/pages/admin/AdminLogin'));
const ZaDashboard = lazy(() => import('./Country/SouthAfrica/pages/admin/Dashboard'));
const ZaManageArticles = lazy(() => import('./Country/SouthAfrica/pages/admin/ManageArticles'));
const ZaManageCategories = lazy(() => import('./Country/SouthAfrica/pages/admin/ManageCategories'));
const ZaManageHero = lazy(() => import('./Country/SouthAfrica/pages/admin/ManageHero'));

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
          <Route path="/Packages" element={<Packages />} />
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
        <Route path="/bangladesh" element={<BdAuthProvider><BdPublicLayout /></BdAuthProvider>}>
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
        <Route path="/bangladesh/TDNG_Admin/login" element={<BdAuthProvider><BdAdminLogin /></BdAuthProvider>} />
        <Route path="/bangladesh/TDNG_Admin" element={<BdAuthProvider><BdAdminLayout /></BdAuthProvider>}>
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
        <Route path="/australia" element={<AuAuthProvider><AuPublicLayout /></AuAuthProvider>}>
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
        <Route path="/australia/TDNG_Admin/login" element={<AuAuthProvider><AuAdminLogin /></AuAuthProvider>} />
        <Route path="/australia/TDNG_Admin" element={<AuAuthProvider><AuAdminLayout /></AuAuthProvider>}>
          <Route index element={<AuDashboard />} />
          <Route path="dashboard" element={<AuDashboard />} />
          <Route path="programs" element={<AuManagePrograms />} />
          <Route path="episodes" element={<AuManageEpisodes />} />
          <Route path="articles" element={<AuManageArticles />} />
          <Route path="categories" element={<AuManageCategories />} />
          <Route path="heroes" element={<AuManageHero />} />
        </Route>

        {/* ── New Zealand Public Routes ── */}
        <Route path="/new-zealand" element={<NzAuthProvider><NzPublicLayout /></NzAuthProvider>}>
          <Route index element={<NzHome />} />
          <Route path="articles" element={<NzArticles />} />
          <Route path="articles/:slug" element={<NzArticleDetail />} />
          <Route path="about" element={<NzAbout />} />
          <Route path="contact" element={<NzContact />} />
          <Route path="search" element={<NzSearch />} />
        </Route>

        {/* ── New Zealand Admin Routes ── */}
        <Route path="/new-zealand/TDNG_Admin/login" element={<NzAuthProvider><NzAdminLogin /></NzAuthProvider>} />
        <Route path="/new-zealand/TDNG_Admin" element={<NzAuthProvider><NzAdminLayout /></NzAuthProvider>}>
          <Route index element={<NzDashboard />} />
          <Route path="dashboard" element={<NzDashboard />} />
          <Route path="articles" element={<NzManageArticles />} />
          <Route path="categories" element={<NzManageCategories />} />
          <Route path="heroes" element={<NzManageHero />} />
        </Route>

        {/* ── Japan Routes ── */}
        <Route path="/japan" element={<JpAuthProvider><JpPublicLayout /></JpAuthProvider>}>
          <Route index element={<JpHome />} />
          <Route path="articles" element={<JpArticles />} />
          <Route path="articles/:slug" element={<JpArticleDetail />} />
          <Route path="about" element={<JpAbout />} />
          <Route path="contact" element={<JpContact />} />
          <Route path="search" element={<JpSearch />} />
        </Route>
        <Route path="/japan/TDNG_Admin/login" element={<JpAuthProvider><JpAdminLogin /></JpAuthProvider>} />
        <Route path="/japan/TDNG_Admin" element={<JpAuthProvider><JpAdminLayout /></JpAuthProvider>}>
          <Route index element={<JpDashboard />} />
          <Route path="dashboard" element={<JpDashboard />} />
          <Route path="articles" element={<JpManageArticles />} />
          <Route path="categories" element={<JpManageCategories />} />
          <Route path="heroes" element={<JpManageHero />} />
        </Route>

        {/* ── India Routes ── */}
        <Route path="/india" element={<InAuthProvider><InPublicLayout /></InAuthProvider>}>
          <Route index element={<InHome />} />
          <Route path="articles" element={<InArticles />} />
          <Route path="articles/:slug" element={<InArticleDetail />} />
          <Route path="about" element={<InAbout />} />
          <Route path="contact" element={<InContact />} />
          <Route path="search" element={<InSearch />} />
        </Route>
        <Route path="/india/TDNG_Admin/login" element={<InAuthProvider><InAdminLogin /></InAuthProvider>} />
        <Route path="/india/TDNG_Admin" element={<InAuthProvider><InAdminLayout /></InAuthProvider>}>
          <Route index element={<InDashboard />} />
          <Route path="dashboard" element={<InDashboard />} />
          <Route path="articles" element={<InManageArticles />} />
          <Route path="categories" element={<InManageCategories />} />
          <Route path="heroes" element={<InManageHero />} />
        </Route>

        {/* ── USA Routes ── */}
        <Route path="/usa" element={<UsAuthProvider><UsPublicLayout /></UsAuthProvider>}>
          <Route index element={<UsHome />} />
          <Route path="articles" element={<UsArticles />} />
          <Route path="articles/:slug" element={<UsArticleDetail />} />
          <Route path="about" element={<UsAbout />} />
          <Route path="contact" element={<UsContact />} />
          <Route path="search" element={<UsSearch />} />
        </Route>
        <Route path="/usa/TDNG_Admin/login" element={<UsAuthProvider><UsAdminLogin /></UsAuthProvider>} />
        <Route path="/usa/TDNG_Admin" element={<UsAuthProvider><UsAdminLayout /></UsAuthProvider>}>
          <Route index element={<UsDashboard />} />
          <Route path="dashboard" element={<UsDashboard />} />
          <Route path="articles" element={<UsManageArticles />} />
          <Route path="categories" element={<UsManageCategories />} />
          <Route path="heroes" element={<UsManageHero />} />
        </Route>

        {/* ── Thailand Routes ── */}
        <Route path="/thailand" element={<ThAuthProvider><ThPublicLayout /></ThAuthProvider>}>
          <Route index element={<ThHome />} />
          <Route path="articles" element={<ThArticles />} />
          <Route path="articles/:slug" element={<ThArticleDetail />} />
          <Route path="about" element={<ThAbout />} />
          <Route path="contact" element={<ThContact />} />
          <Route path="search" element={<ThSearch />} />
        </Route>
        <Route path="/thailand/TDNG_Admin/login" element={<ThAuthProvider><ThAdminLogin /></ThAuthProvider>} />
        <Route path="/thailand/TDNG_Admin" element={<ThAuthProvider><ThAdminLayout /></ThAuthProvider>}>
          <Route index element={<ThDashboard />} />
          <Route path="dashboard" element={<ThDashboard />} />
          <Route path="articles" element={<ThManageArticles />} />
          <Route path="categories" element={<ThManageCategories />} />
          <Route path="heroes" element={<ThManageHero />} />
        </Route>

        {/* ── Denmark Routes ── */}
        <Route path="/denmark" element={<DkAuthProvider><DkPublicLayout /></DkAuthProvider>}>
          <Route index element={<DkHome />} />
          <Route path="articles" element={<DkArticles />} />
          <Route path="articles/:slug" element={<DkArticleDetail />} />
          <Route path="about" element={<DkAbout />} />
          <Route path="contact" element={<DkContact />} />
          <Route path="search" element={<DkSearch />} />
        </Route>
        <Route path="/denmark/TDNG_Admin/login" element={<DkAuthProvider><DkAdminLogin /></DkAuthProvider>} />
        <Route path="/denmark/TDNG_Admin" element={<DkAuthProvider><DkAdminLayout /></DkAuthProvider>}>
          <Route index element={<DkDashboard />} />
          <Route path="dashboard" element={<DkDashboard />} />
          <Route path="articles" element={<DkManageArticles />} />
          <Route path="categories" element={<DkManageCategories />} />
          <Route path="heroes" element={<DkManageHero />} />
        </Route>

        {/* ── Samoa Routes ── */}
        <Route path="/samoa" element={<SmAuthProvider><SmPublicLayout /></SmAuthProvider>}>
          <Route index element={<SmHome />} />
          <Route path="articles" element={<SmArticles />} />
          <Route path="articles/:slug" element={<SmArticleDetail />} />
          <Route path="about" element={<SmAbout />} />
          <Route path="contact" element={<SmContact />} />
          <Route path="search" element={<SmSearch />} />
        </Route>
        <Route path="/samoa/TDNG_Admin/login" element={<SmAuthProvider><SmAdminLogin /></SmAuthProvider>} />
        <Route path="/samoa/TDNG_Admin" element={<SmAuthProvider><SmAdminLayout /></SmAuthProvider>}>
          <Route index element={<SmDashboard />} />
          <Route path="dashboard" element={<SmDashboard />} />
          <Route path="articles" element={<SmManageArticles />} />
          <Route path="categories" element={<SmManageCategories />} />
          <Route path="heroes" element={<SmManageHero />} />
        </Route>

        {/* ── South Africa Routes ── */}
        <Route path="/south-africa" element={<ZaAuthProvider><ZaPublicLayout /></ZaAuthProvider>}>
          <Route index element={<ZaHome />} />
          <Route path="articles" element={<ZaArticles />} />
          <Route path="articles/:slug" element={<ZaArticleDetail />} />
          <Route path="about" element={<ZaAbout />} />
          <Route path="contact" element={<ZaContact />} />
          <Route path="search" element={<ZaSearch />} />
        </Route>
        <Route path="/south-africa/TDNG_Admin/login" element={<ZaAuthProvider><ZaAdminLogin /></ZaAuthProvider>} />
        <Route path="/south-africa/TDNG_Admin" element={<ZaAuthProvider><ZaAdminLayout /></ZaAuthProvider>}>
          <Route index element={<ZaDashboard />} />
          <Route path="dashboard" element={<ZaDashboard />} />
          <Route path="articles" element={<ZaManageArticles />} />
          <Route path="categories" element={<ZaManageCategories />} />
          <Route path="heroes" element={<ZaManageHero />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
