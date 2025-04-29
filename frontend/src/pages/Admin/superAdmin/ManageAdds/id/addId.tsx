import { useParams } from 'react-router-dom';

import UpdateAddsForm from './components/updateAdd-form'




const AddId = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <UpdateAddsForm initialData={null}/>
            </div>
        </div>
    )
}

export default AddId
