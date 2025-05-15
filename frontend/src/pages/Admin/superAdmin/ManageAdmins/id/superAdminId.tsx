import { useParams } from 'react-router-dom';

import UpdateAdminForm from './components/updateSuperAdmin-form'
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../../../lib/utils';
import axios from 'axios';

const SuperAdminId = () => {
    const { id } = useParams<{ id: string }>();
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (!id || id === "new") return;


        const fetchAdmin = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/admin/${id}`,{
                    withCredentials: true
                });
                setInitialData(res.data);
            } catch (err: any) {
                // console.error("Failed to fetch admins:", err);
                setInitialData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [id]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading Admins...</div>;
    }



    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAdminForm initialData={initialData} />
            </div>
        </div>
    )
}

export default SuperAdminId
