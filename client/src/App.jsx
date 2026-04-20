import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthProvider as BdAuthProvider } from './Bangladesh/context/AuthContext';
import { AuthProvider as AuAuthProvider } from './Australia/context/AuthContext';
import { AuthProvider as NzAuthProvider } from './NewZealand/context/AuthContext';
import { AuthProvider as JpAuthProvider } from './Japan/context/AuthContext';
import { AuthProvider as InAuthProvider } from './India/context/AuthContext';
import { AuthProvider as UsAuthProvider } from './USA/context/AuthContext';
import { AuthProvider as ThAuthProvider } from './Thailand/context/AuthContext';
import { AuthProvider as DkAuthProvider } from './Denmark/context/AuthContext';
import { AuthProvider as SmAuthProvider } from './Samoa/context/AuthContext';
import { AuthProvider as ZaAuthProvider } from './SouthAfrica/context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Layouts (Remain eager as they are small and used by almost everything)
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import BdPublicLayout from './Bangladesh/layouts/PublicLayout';
import BdAdminLayout from './Bangladesh/layouts/AdminLayout';
import AuPublicLayout from './Australia/layouts/PublicLayout';
import AuAdminLayout from './Australia/layouts/AdminLayout';
import NzPublicLayout from './NewZealand/layouts/PublicLayout';
import NzAdminLayout from './NewZealand/layouts/AdminLayout';
import JpPublicLayout from './Japan/layouts/PublicLayout';
import JpAdminLayout from './Japan/layouts/AdminLayout';
import InPublicLayout from './India/layouts/PublicLayout';
import InAdminLayout from './India/layouts/AdminLayout';
import UsPublicLayout from './USA/layouts/PublicLayout';
import UsAdminLayout from './USA/layouts/AdminLayout';
import ThPublicLayout from './Thailand/layouts/PublicLayout';
import ThAdminLayout from './Thailand/layouts/AdminLayout';
import DkPublicLayout from './Denmark/layouts/PublicLayout';
import DkAdminLayout from './Denmark/layouts/AdminLayout';
import SmPublicLayout from './Samoa/layouts/PublicLayout';
import SmAdminLayout from './Samoa/layouts/AdminLayout';
import ZaPublicLayout from './SouthAfrica/layouts/PublicLayout';
import ZaAdminLayout from './SouthAfrica/layouts/AdminLayout';

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
const Products = lazy(() => import('./pages/Products'));

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

// New Zealand Public Pages (Lazy)
const NzHome = lazy(() => import('./NewZealand/pages/Home'));
const NzArticles = lazy(() => import('./NewZealand/pages/Articles'));
const NzArticleDetail = lazy(() => import('./NewZealand/pages/ArticleDetail'));
const NzAbout = lazy(() => import('./NewZealand/pages/About'));
const NzContact = lazy(() => import('./NewZealand/pages/Contact'));
const NzSearch = lazy(() => import('./NewZealand/pages/Search'));

// New Zealand Admin Pages (Lazy)
const NzAdminLogin = lazy(() => import('./NewZealand/pages/admin/AdminLogin'));
const NzDashboard = lazy(() => import('./NewZealand/pages/admin/Dashboard'));
const NzManageArticles = lazy(() => import('./NewZealand/pages/admin/ManageArticles'));
const NzManageCategories = lazy(() => import('./NewZealand/pages/admin/ManageCategories'));
const NzManageHero = lazy(() => import('./NewZealand/pages/admin/ManageHero'));

// Japan Pages (Lazy)
const JpHome = lazy(() => import('./Japan/pages/Home'));
const JpArticles = lazy(() => import('./Japan/pages/Articles'));
const JpArticleDetail = lazy(() => import('./Japan/pages/ArticleDetail'));
const JpAbout = lazy(() => import('./Japan/pages/About'));
const JpContact = lazy(() => import('./Japan/pages/Contact'));
const JpSearch = lazy(() => import('./Japan/pages/Search'));
const JpAdminLogin = lazy(() => import('./Japan/pages/admin/AdminLogin'));
const JpDashboard = lazy(() => import('./Japan/pages/admin/Dashboard'));
const JpManageArticles = lazy(() => import('./Japan/pages/admin/ManageArticles'));
const JpManageCategories = lazy(() => import('./Japan/pages/admin/ManageCategories'));
const JpManageHero = lazy(() => import('./Japan/pages/admin/ManageHero'));

// India Pages (Lazy)
const InHome = lazy(() => import('./India/pages/Home'));
const InArticles = lazy(() => import('./India/pages/Articles'));
const InArticleDetail = lazy(() => import('./India/pages/ArticleDetail'));
const InAbout = lazy(() => import('./India/pages/About'));
const InContact = lazy(() => import('./India/pages/Contact'));
const InSearch = lazy(() => import('./India/pages/Search'));
const InAdminLogin = lazy(() => import('./India/pages/admin/AdminLogin'));
const InDashboard = lazy(() => import('./India/pages/admin/Dashboard'));
const InManageArticles = lazy(() => import('./India/pages/admin/ManageArticles'));
const InManageCategories = lazy(() => import('./India/pages/admin/ManageCategories'));
const InManageHero = lazy(() => import('./India/pages/admin/ManageHero'));

// USA Pages (Lazy)
const UsHome = lazy(() => import('./USA/pages/Home'));
const UsArticles = lazy(() => import('./USA/pages/Articles'));
const UsArticleDetail = lazy(() => import('./USA/pages/ArticleDetail'));
const UsAbout = lazy(() => import('./USA/pages/About'));
const UsContact = lazy(() => import('./USA/pages/Contact'));
const UsSearch = lazy(() => import('./USA/pages/Search'));
const UsAdminLogin = lazy(() => import('./USA/pages/admin/AdminLogin'));
const UsDashboard = lazy(() => import('./USA/pages/admin/Dashboard'));
const UsManageArticles = lazy(() => import('./USA/pages/admin/ManageArticles'));
const UsManageCategories = lazy(() => import('./USA/pages/admin/ManageCategories'));
const UsManageHero = lazy(() => import('./USA/pages/admin/ManageHero'));

// Thailand Pages (Lazy)
const ThHome = lazy(() => import('./Thailand/pages/Home'));
const ThArticles = lazy(() => import('./Thailand/pages/Articles'));
const ThArticleDetail = lazy(() => import('./Thailand/pages/ArticleDetail'));
const ThAbout = lazy(() => import('./Thailand/pages/About'));
const ThContact = lazy(() => import('./Thailand/pages/Contact'));
const ThSearch = lazy(() => import('./Thailand/pages/Search'));
const ThAdminLogin = lazy(() => import('./Thailand/pages/admin/AdminLogin'));
const ThDashboard = lazy(() => import('./Thailand/pages/admin/Dashboard'));
const ThManageArticles = lazy(() => import('./Thailand/pages/admin/ManageArticles'));
const ThManageCategories = lazy(() => import('./Thailand/pages/admin/ManageCategories'));
const ThManageHero = lazy(() => import('./Thailand/pages/admin/ManageHero'));

// Denmark Pages (Lazy)
const DkHome = lazy(() => import('./Denmark/pages/Home'));
const DkArticles = lazy(() => import('./Denmark/pages/Articles'));
const DkArticleDetail = lazy(() => import('./Denmark/pages/ArticleDetail'));
const DkAbout = lazy(() => import('./Denmark/pages/About'));
const DkContact = lazy(() => import('./Denmark/pages/Contact'));
const DkSearch = lazy(() => import('./Denmark/pages/Search'));
const DkAdminLogin = lazy(() => import('./Denmark/pages/admin/AdminLogin'));
const DkDashboard = lazy(() => import('./Denmark/pages/admin/Dashboard'));
const DkManageArticles = lazy(() => import('./Denmark/pages/admin/ManageArticles'));
const DkManageCategories = lazy(() => import('./Denmark/pages/admin/ManageCategories'));
const DkManageHero = lazy(() => import('./Denmark/pages/admin/ManageHero'));

// Samoa Pages (Lazy)
const SmHome = lazy(() => import('./Samoa/pages/Home'));
const SmArticles = lazy(() => import('./Samoa/pages/Articles'));
const SmArticleDetail = lazy(() => import('./Samoa/pages/ArticleDetail'));
const SmAbout = lazy(() => import('./Samoa/pages/About'));
const SmContact = lazy(() => import('./Samoa/pages/Contact'));
const SmSearch = lazy(() => import('./Samoa/pages/Search'));
const SmAdminLogin = lazy(() => import('./Samoa/pages/admin/AdminLogin'));
const SmDashboard = lazy(() => import('./Samoa/pages/admin/Dashboard'));
const SmManageArticles = lazy(() => import('./Samoa/pages/admin/ManageArticles'));
const SmManageCategories = lazy(() => import('./Samoa/pages/admin/ManageCategories'));
const SmManageHero = lazy(() => import('./Samoa/pages/admin/ManageHero'));

// South Africa Pages (Lazy)
const ZaHome = lazy(() => import('./SouthAfrica/pages/Home'));
const ZaArticles = lazy(() => import('./SouthAfrica/pages/Articles'));
const ZaArticleDetail = lazy(() => import('./SouthAfrica/pages/ArticleDetail'));
const ZaAbout = lazy(() => import('./SouthAfrica/pages/About'));
const ZaContact = lazy(() => import('./SouthAfrica/pages/Contact'));
const ZaSearch = lazy(() => import('./SouthAfrica/pages/Search'));
const ZaAdminLogin = lazy(() => import('./SouthAfrica/pages/admin/AdminLogin'));
const ZaDashboard = lazy(() => import('./SouthAfrica/pages/admin/Dashboard'));
const ZaManageArticles = lazy(() => import('./SouthAfrica/pages/admin/ManageArticles'));
const ZaManageCategories = lazy(() => import('./SouthAfrica/pages/admin/ManageCategories'));
const ZaManageHero = lazy(() => import('./SouthAfrica/pages/admin/ManageHero'));

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
          <Route path="/Products" element={<Products />} />
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

        {/* ── New Zealand Public Routes ── */}
        <Route path="/NewZealand" element={<NzAuthProvider><NzPublicLayout /></NzAuthProvider>}>
          <Route index element={<NzHome />} />
          <Route path="articles" element={<NzArticles />} />
          <Route path="articles/:slug" element={<NzArticleDetail />} />
          <Route path="about" element={<NzAbout />} />
          <Route path="contact" element={<NzContact />} />
          <Route path="search" element={<NzSearch />} />
        </Route>

        {/* ── New Zealand Admin Routes ── */}
        <Route path="/NewZealand/TDNG_Admin/login" element={<NzAuthProvider><NzAdminLogin /></NzAuthProvider>} />
        <Route path="/NewZealand/TDNG_Admin" element={<NzAuthProvider><NzAdminLayout /></NzAuthProvider>}>
          <Route index element={<NzDashboard />} />
          <Route path="dashboard" element={<NzDashboard />} />
          <Route path="articles" element={<NzManageArticles />} />
          <Route path="categories" element={<NzManageCategories />} />
          <Route path="heroes" element={<NzManageHero />} />
        </Route>

        {/* ── Japan Routes ── */}
        <Route path="/Japan" element={<JpAuthProvider><JpPublicLayout /></JpAuthProvider>}>
          <Route index element={<JpHome />} />
          <Route path="articles" element={<JpArticles />} />
          <Route path="articles/:slug" element={<JpArticleDetail />} />
          <Route path="about" element={<JpAbout />} />
          <Route path="contact" element={<JpContact />} />
          <Route path="search" element={<JpSearch />} />
        </Route>
        <Route path="/Japan/TDNG_Admin/login" element={<JpAuthProvider><JpAdminLogin /></JpAuthProvider>} />
        <Route path="/Japan/TDNG_Admin" element={<JpAuthProvider><JpAdminLayout /></JpAuthProvider>}>
          <Route index element={<JpDashboard />} />
          <Route path="dashboard" element={<JpDashboard />} />
          <Route path="articles" element={<JpManageArticles />} />
          <Route path="categories" element={<JpManageCategories />} />
          <Route path="heroes" element={<JpManageHero />} />
        </Route>

        {/* ── India Routes ── */}
        <Route path="/India" element={<InAuthProvider><InPublicLayout /></InAuthProvider>}>
          <Route index element={<InHome />} />
          <Route path="articles" element={<InArticles />} />
          <Route path="articles/:slug" element={<InArticleDetail />} />
          <Route path="about" element={<InAbout />} />
          <Route path="contact" element={<InContact />} />
          <Route path="search" element={<InSearch />} />
        </Route>
        <Route path="/India/TDNG_Admin/login" element={<InAuthProvider><InAdminLogin /></InAuthProvider>} />
        <Route path="/India/TDNG_Admin" element={<InAuthProvider><InAdminLayout /></InAuthProvider>}>
          <Route index element={<InDashboard />} />
          <Route path="dashboard" element={<InDashboard />} />
          <Route path="articles" element={<InManageArticles />} />
          <Route path="categories" element={<InManageCategories />} />
          <Route path="heroes" element={<InManageHero />} />
        </Route>

        {/* ── USA Routes ── */}
        <Route path="/USA" element={<UsAuthProvider><UsPublicLayout /></UsAuthProvider>}>
          <Route index element={<UsHome />} />
          <Route path="articles" element={<UsArticles />} />
          <Route path="articles/:slug" element={<UsArticleDetail />} />
          <Route path="about" element={<UsAbout />} />
          <Route path="contact" element={<UsContact />} />
          <Route path="search" element={<UsSearch />} />
        </Route>
        <Route path="/USA/TDNG_Admin/login" element={<UsAuthProvider><UsAdminLogin /></UsAuthProvider>} />
        <Route path="/USA/TDNG_Admin" element={<UsAuthProvider><UsAdminLayout /></UsAuthProvider>}>
          <Route index element={<UsDashboard />} />
          <Route path="dashboard" element={<UsDashboard />} />
          <Route path="articles" element={<UsManageArticles />} />
          <Route path="categories" element={<UsManageCategories />} />
          <Route path="heroes" element={<UsManageHero />} />
        </Route>

        {/* ── Thailand Routes ── */}
        <Route path="/Thailand" element={<ThAuthProvider><ThPublicLayout /></ThAuthProvider>}>
          <Route index element={<ThHome />} />
          <Route path="articles" element={<ThArticles />} />
          <Route path="articles/:slug" element={<ThArticleDetail />} />
          <Route path="about" element={<ThAbout />} />
          <Route path="contact" element={<ThContact />} />
          <Route path="search" element={<ThSearch />} />
        </Route>
        <Route path="/Thailand/TDNG_Admin/login" element={<ThAuthProvider><ThAdminLogin /></ThAuthProvider>} />
        <Route path="/Thailand/TDNG_Admin" element={<ThAuthProvider><ThAdminLayout /></ThAuthProvider>}>
          <Route index element={<ThDashboard />} />
          <Route path="dashboard" element={<ThDashboard />} />
          <Route path="articles" element={<ThManageArticles />} />
          <Route path="categories" element={<ThManageCategories />} />
          <Route path="heroes" element={<ThManageHero />} />
        </Route>

        {/* ── Denmark Routes ── */}
        <Route path="/Denmark" element={<DkAuthProvider><DkPublicLayout /></DkAuthProvider>}>
          <Route index element={<DkHome />} />
          <Route path="articles" element={<DkArticles />} />
          <Route path="articles/:slug" element={<DkArticleDetail />} />
          <Route path="about" element={<DkAbout />} />
          <Route path="contact" element={<DkContact />} />
          <Route path="search" element={<DkSearch />} />
        </Route>
        <Route path="/Denmark/TDNG_Admin/login" element={<DkAuthProvider><DkAdminLogin /></DkAuthProvider>} />
        <Route path="/Denmark/TDNG_Admin" element={<DkAuthProvider><DkAdminLayout /></DkAuthProvider>}>
          <Route index element={<DkDashboard />} />
          <Route path="dashboard" element={<DkDashboard />} />
          <Route path="articles" element={<DkManageArticles />} />
          <Route path="categories" element={<DkManageCategories />} />
          <Route path="heroes" element={<DkManageHero />} />
        </Route>

        {/* ── Samoa Routes ── */}
        <Route path="/Samoa" element={<SmAuthProvider><SmPublicLayout /></SmAuthProvider>}>
          <Route index element={<SmHome />} />
          <Route path="articles" element={<SmArticles />} />
          <Route path="articles/:slug" element={<SmArticleDetail />} />
          <Route path="about" element={<SmAbout />} />
          <Route path="contact" element={<SmContact />} />
          <Route path="search" element={<SmSearch />} />
        </Route>
        <Route path="/Samoa/TDNG_Admin/login" element={<SmAuthProvider><SmAdminLogin /></SmAuthProvider>} />
        <Route path="/Samoa/TDNG_Admin" element={<SmAuthProvider><SmAdminLayout /></SmAuthProvider>}>
          <Route index element={<SmDashboard />} />
          <Route path="dashboard" element={<SmDashboard />} />
          <Route path="articles" element={<SmManageArticles />} />
          <Route path="categories" element={<SmManageCategories />} />
          <Route path="heroes" element={<SmManageHero />} />
        </Route>

        {/* ── South Africa Routes ── */}
        <Route path="/SouthAfrica" element={<ZaAuthProvider><ZaPublicLayout /></ZaAuthProvider>}>
          <Route index element={<ZaHome />} />
          <Route path="articles" element={<ZaArticles />} />
          <Route path="articles/:slug" element={<ZaArticleDetail />} />
          <Route path="about" element={<ZaAbout />} />
          <Route path="contact" element={<ZaContact />} />
          <Route path="search" element={<ZaSearch />} />
        </Route>
        <Route path="/SouthAfrica/TDNG_Admin/login" element={<ZaAuthProvider><ZaAdminLogin /></ZaAuthProvider>} />
        <Route path="/SouthAfrica/TDNG_Admin" element={<ZaAuthProvider><ZaAdminLayout /></ZaAuthProvider>}>
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
