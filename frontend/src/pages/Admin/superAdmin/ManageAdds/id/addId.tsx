import { useParams } from 'react-router-dom';

import UpdateAddsForm from './components/updateAdd-form'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../../lib/utils';




const AddId = () => {
    const { id } = useParams<{ id: string }>();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id || id === "new") return;


        const fetchAdmin = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/ads/${id}`);
                setInitialData(res.data.ad);
            } catch (err: any) {
                // console.error("Failed to fetch Ad:", err);
                setInitialData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [id]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading Ads...</div>;
    }
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAddsForm initialData={initialData} />
            </div>
        </div>
    )
}

export default AddId
