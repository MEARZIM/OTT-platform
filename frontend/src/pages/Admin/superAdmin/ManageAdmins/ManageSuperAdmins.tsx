import { useEffect, useState } from "react";
import { AdminClient } from "./components/client"
import { BACKEND_URL } from "../../../../lib/utils";
import { AdminColumn } from "./components/columns";
import axios from "axios";
import { format } from "date-fns";







const ManageAdmins = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/admin`,{
          withCredentials: true
        });
        const data = res.data;

        const formatted: AdminColumn[] = data.map((item: {
          id: string;
          name: string;
          email: string;
          uploadedVideos?: any[];
          createdAt?: string;
        }) => ({
          id: item.id,
          admin: item.name,
          email: item.email,
          video: item.uploadedVideos?.length || 0,
          createdAt: item.createdAt ? format(new Date(item.createdAt), "MMMM do yyyy") : "Unknown"
        }));

        setAdmins(formatted);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching admins:", err);
        setError("Failed to load admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading Admins...</div>;
  }


  return (
    <>
      <AdminClient data={admins} />
    </>
  )
}

export default ManageAdmins
