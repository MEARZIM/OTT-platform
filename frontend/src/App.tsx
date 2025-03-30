import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"; 
import AdminLogin from "./pages/Admin/login/Login";
import { Toaster } from './components/ui/toaster';
import SuperAdmin from "./pages/Admin/superAdmin/SuperAdmin";
import AdminPannel from "./pages/Admin/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin/>} />

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
