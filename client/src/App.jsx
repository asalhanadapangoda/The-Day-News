import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Chatbot from './components/common/Chatbot';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// User Pages
import HomePage from './pages/HomePage';
import PodcastsPage from './pages/PodcastsPage';
import SingleEpisodePage from './pages/SingleEpisodePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddPodcast from './pages/admin/AddPodcast';
import EditPodcast from './pages/admin/EditPodcast';
import UpdatePodcast from './pages/admin/UpdatePodcast';

// Layout wrapper for user pages
const UserLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - All protected */}
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard/edit-podcast" replace />} />
          <Route path="add-podcast" element={<AddPodcast />} />
          <Route path="edit-podcast" element={<EditPodcast />} />
          <Route path="edit-podcast/:id" element={<UpdatePodcast />} />
        </Route>
        
        {/* Catch-all for any other admin routes - redirect to login */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/podcasts/:id" element={<SingleEpisodePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
