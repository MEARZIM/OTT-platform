import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Client } from "./components/client"
import { BACKEND_URL } from "../../../lib/utils";
import { Column } from "./components/columns";
import Loading from "../../../components/Loading";



const ManageVideos = () => {
  const [videos, setVideos] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${BACKEND_URL}/api/content/video/uploaded-by`, {
          withCredentials: true
        })
        const formatted: Column[] = res.data.map((item: {
          id: string;
          title: string;
          description: string;
          rating: string;
          status: string;
          createdAt: string;
        }) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          rating: item.rating,
          status: item.status,
          createdAt: item.createdAt ? format(new Date(item.createdAt), "MMMM do yyyy") : "Unknown"
        }));
        setVideos(formatted)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getVideos();
  }, [])


  if (loading) {
    return <>
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    </>
  }


  return (
    <>
      <Client data={videos} />
    </>
  )
}

export default ManageVideos
