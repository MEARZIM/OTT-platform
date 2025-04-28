import { AdminClient } from "./components/client"

const dummy = [
    {
      "id": "1",
      "admin": "John Doe",
      "email": "john.doe@example.com",
      "password": "securePass123",
      "video": 5,
      "createdAt": "March 15th 2024"
    },
    {
      "id": "2",
      "admin": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "JanePass456",
      "video": 3,
      "createdAt": "January 8th 2024"
    },
    {
      "id": "3",
      "admin": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "password": "AlicePass789",
      "video": 7,
      "createdAt": "February 20th 2024"
    },
    {
      "id": "4",
      "admin": "Robert Brown",
      "email": "robert.brown@example.com",
      "password": "RobertSecure321",
      "video": 2,
      "createdAt": "April 5th 2024"
    },
    {
      "id": "5",
      "admin": "Emily Davis",
      "email": "emily.davis@example.com",
      "password": "EmilyStrong999",
      "video": 4,
      "createdAt": "May 10th 2024"
    }
  ]
  
  



const ManageAdmins = () => {
    return (
        <>
            <AdminClient data={dummy} />
        </>
    )
}

export default ManageAdmins
