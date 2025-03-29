import { useParams } from 'react-router-dom';

import UpdateAdminForm from './components/updateAdmin-form'

const AdminId = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAdminForm initialData={null} />
            </div>
        </div>
    )
}

export default AdminId
