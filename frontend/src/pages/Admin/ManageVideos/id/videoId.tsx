import { useParams } from 'react-router-dom';

import UpdateAdminForm from './components/updateVideo-form'

const VideoId = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAdminForm />
            </div>
        </div>
    )
}

export default VideoId
