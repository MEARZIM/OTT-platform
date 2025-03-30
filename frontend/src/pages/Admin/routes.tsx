import { Route, Routes } from "react-router-dom"
import Default from "./default"
import AdminDashboard from "./dashboard/AdminDashboard"
import ManageVideos from "./ManageVideos/ManageVideos"
import VideoId from "./ManageVideos/id/videoId"


const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-videos" element={<ManageVideos />} />
                <Route path="manage-videos/:id" element={<VideoId />} />
                <Route path="*" element={
                   <Default />
                } /> 
            </Routes>
        </div>
    )
}

export default AdminRoutes
