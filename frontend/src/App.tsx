import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from './components/ui/toaster';
import Loading from "./components/Loading";

// Lazy-loaded components
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const SuperAdmin = lazy(() => import("./pages/Admin/superAdmin/SuperAdmin"));
const AdminPannel = lazy(() => import("./pages/Admin/Admin"));
const DashboardPage = lazy(() => import("./pages/User/Dashboard/DashboardPage"));
const MyStuffPage = lazy(() => import("./pages/User/Dashboard/pages/MyStuff/MyStuffPage"));
const SettingsPage = lazy(() => import("./pages/User/Dashboard/pages/Settings/SettingsPage"));
const WatchHistoryPage = lazy(() => import("./pages/User/Dashboard/pages/Settings/pages/WatchHistory"));
const Watch = lazy(() => import("./pages/User/Watch/Watch"));
const SubscriptionPage = lazy(() => import("./pages/User/Subscription/subscribe/SubscribePage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      }
      >
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/mystuff' element={<MyStuffPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path="/settings/watch-history" element={<WatchHistoryPage />} />
          <Route path="/player/:id" element={<Watch />} />
          <Route path="/subscription" element={<SubscriptionPage />} />

          {/* Super Admin Routes */}
          <Route path='/super-admin/*' element={<SuperAdmin />} />

          {/* Admin Routes */}
          <Route path='/admin/*' element={<AdminPannel />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
