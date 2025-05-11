import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { BACKEND_URL } from '../../../../lib/utils';
import Loading from '../../../../components/Loading';
import UpdateAdminForm from './components/updateVideo-form'

const VideoId = () => {
    const { id } = useParams<{ id: string }>();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id || id === "new") return;


        const fetchVideo = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/content/video/${id}`);
                setInitialData(res.data);
            } catch (err: any) {
                // console.error("Failed to fetch Ad:", err);
                setInitialData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    console.log(initialData)

    if (loading) {
        return <>
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        </>
    }


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAdminForm initialData={initialData} />
            </div>
        </div>
    )
}

export default VideoId
