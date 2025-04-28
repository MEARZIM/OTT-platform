import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Category from "./ManageCategories/Category";
import SuperAdminId from "./ManageAdmins/id/superAdminId";
import ManageSuperAdmins from "./ManageAdmins/ManageSuperAdmins";
import ManageCategory from "./ManageCategories/id/ManageCategory";

import Default from "./default";

const SuperAdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage-admins/:id" element={<SuperAdminId />} />
                <Route path="manage-admins" element={<ManageSuperAdmins />} />
                <Route path="manage-categories" element={<Category />} />
                <Route path="manage-categories/:id" element={<ManageCategory />} />
                <Route path="*" element={
                   <Default />
                } />
            </Routes>
        </div>
    )
}

export default SuperAdminRoutes
