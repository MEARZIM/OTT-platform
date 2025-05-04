import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Toaster } from './components/ui/toaster';
import SuperAdmin from "./pages/Admin/superAdmin/SuperAdmin";
import AdminPannel from "./pages/Admin/Admin";
import DashboardPage from "./pages/User/Dashboard/DashboardPage";
import MyStuffPage from "./pages/User/Dashboard/pages/MyStuff/MyStuffPage";
import SettingsPage from "./pages/User/Dashboard/pages/Settings/SettingsPage";
import WatchHistoryPage from "./pages/User/Dashboard/pages/Settings/pages/WatchHistory";
import Watch from "./pages/User/Watch/Watch";

const App = () => {
  return (
    <Router>
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
        

        {/* Super Admin Routes */}
        <Route path='/super-admin/*' element={<SuperAdmin />} />

        {/* Admin Routes */}
        <Route path='/admin/*' element={<AdminPannel />} />

        
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
