import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import MangeAdds from "./ManageAdds/MangeAdds";
import Category from "./ManageCategories/Category";
import SuperAdminId from "./ManageAdmins/id/superAdminId";
import ManageSuperAdmins from "./ManageAdmins/ManageSuperAdmins";
import ManageCategory from "./ManageCategories/id/ManageCategory";
import AddId from "./ManageAdds/id/addId";

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
                <Route path="manage-adds" element={<MangeAdds />} />
                <Route path="manage-adds/:id" element={<AddId />} />
                <Route path="*" element={
                   <Default />
                } />
            </Routes>
        </div>
    )
}

export default SuperAdminRoutes
