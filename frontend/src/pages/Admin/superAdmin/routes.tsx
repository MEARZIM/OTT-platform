import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ManageAdmins from "./ManageAdmins/ManageAdmins";
import Default from "./default";

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage-admins" element={<ManageAdmins />} />
                <Route path="*" element={
                   <Default />
                } />
            </Routes>
        </div>
    )
}

export default AdminRoutes
