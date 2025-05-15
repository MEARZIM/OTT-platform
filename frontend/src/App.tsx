import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from './components/ui/toaster';
import Loading from "./components/Loading";
import PrivateRoute from "./components/routes/PrivateRoute";
import { ThemeProvider } from "./providers/Theme-Provider";
// import { UserProvider } from "./session/auth-context";
import ProtectedRoute from "./components/routes/ProtectedUserRoutes";

// Lazy-loaded components
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const AdminLogin = lazy(() => import("./pages/Admin/login/AdminLogin"));
const Register = lazy(() => import("./pages/register/Register"));
const SuperAdmin = lazy(() => import("./pages/Admin/superAdmin/SuperAdmin"));
const AdminPannel = lazy(() => import("./pages/Admin/Admin"));
const DashboardPage = lazy(() => import("./pages/User/Dashboard/DashboardPage"));
const MyStuffPage = lazy(() => import("./pages/User/Dashboard/pages/MyStuff/MyStuffPage"));
const SettingsPage = lazy(() => import("./pages/User/Dashboard/pages/Settings/SettingsPage"));
const WatchHistoryPage = lazy(() => import("./pages/User/Dashboard/pages/Settings/pages/WatchHistory"));
const Watch = lazy(() => import("./pages/User/Watch/Watch"));
const SubscriptionPage = lazy(() => import("./pages/User/Subscription/subscribe/SubscribePage"));
const SuccessPage = lazy(() => import("./pages/User/Subscription/pages/Success"));
const CancelPage = lazy(() => import("./pages/User/Subscription/pages/Cancel"));
const YourAccountPage = lazy(() => import("./pages/User/Dashboard/pages/Settings/pages/YourAccount"));
const CategoryPage = lazy(() => import("./pages/User/Dashboard/pages/Categories/CategoriesPage"))

const App = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/signup' element={<Register />} />

            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/subscription-success" element={<SuccessPage />} />
            <Route path="/subscription-cancel" element={<CancelPage />} />

            {/* Public Routes */}

            {/* Protected User Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mystuff" element={<MyStuffPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/watch-history" element={<WatchHistoryPage />} />
              <Route path="/player/:id" element={<Watch />} />
              <Route path="/settings/account" element={<YourAccountPage />} />
              <Route path="/categories/:id/:name" element={<CategoryPage />} />
            </Route>

            {/* Super Admin Routes */}
            <Route
              path="/super-admin/*"
              element={
                <PrivateRoute requiredRole="SUPER_ADMIN">
                  <SuperAdmin />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            {/* Admin Routes (Protected) */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <AdminPannel />
                </PrivateRoute>
              }
            />
          </Routes>

        </Suspense>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;
