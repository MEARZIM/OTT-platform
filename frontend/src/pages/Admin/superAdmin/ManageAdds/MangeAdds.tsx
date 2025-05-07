import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { AddsClient } from "./components/client"
import { Column } from "./components/columns";

import { BACKEND_URL } from "../../../../lib/utils";

const MangeAdds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/ads`);
        const data = res.data.ads;

        const formatted: Column[] = data.map((item: {
          id: string;
          title: string;
          description: string;
          video: any[];
          type: string;
          createdAt?: string;
        }) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          video: item.video?.length || 0,
          type: item.type,
          createdAt: item.createdAt ? format(new Date(item.createdAt), "MMMM do yyyy") : "Unknown"
        }));

        setAds(formatted);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching admins:", err);
        setError("Failed to load admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading Ads...</div>;
  }

  console.log(ads);
  return (
    <>
      <AddsClient data={ads} />
    </>
  )
}

export default MangeAdds
