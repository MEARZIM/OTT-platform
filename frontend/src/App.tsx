import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"; 
import AdminLogin from "./pages/Admin/login/Login";
import {Toaster} from './components/ui/toaster';
import SuperAdmin from "./pages/superAdmin/SuperAdmin";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard/:email" element={<Dashboard />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/super-admin/dashboard' element={<SuperAdmin/>}/>
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
