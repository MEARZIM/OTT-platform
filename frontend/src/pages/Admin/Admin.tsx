
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft, Menu } from "lucide-react";

import { Button } from "../../components/ui/button";
import { useAdminRouteStore } from "../../lib/store";
import AdminRoutes from "./routes";
import { ADMIN_NAV_ITEMS } from "./admin-nav-items";




const AdminPannel = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActiveSection } = useAdminRouteStore();

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {isMobile && (
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg bg-white" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      )}

      {/* Sidebar */}
      <div className={`${isMobile ? "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out" : "w-64"} 
        ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"} 
        bg-white border-r border-gray-200 flex flex-col`}>

        {isMobile && (
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
        )}

        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-blue-600">PRIMEVIEW</h1>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto space-y-1 px-2">
          {ADMIN_NAV_ITEMS.map(({ id, label, icon: Icon, path }) => (
            <Link
              key={id}
              to={path}
              onClick={() => setActiveSection(path)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-r-md
                ${currentPath === path ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <AdminRoutes />
        </main>
      </div>
    </div>
  );
};

export default AdminPannel;

