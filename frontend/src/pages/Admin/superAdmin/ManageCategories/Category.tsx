import { CategoryClient } from "./components/client"
const dummy = [
    {
      "id": "1",
      "categoryName": "John Doe",
      "video": 5,
      "createdAt": "March 15th 2024"
    },
    {
      "id": "2",
      "categoryName": "Jane Smith",
      "video": 3,
      "createdAt": "January 8th 2024"
    },
    {
      "id": "3",
      "categoryName": "Alice Johnson",
      
      "video": 7,
      "createdAt": "February 20th 2024"
    },
    {
      "id": "4",
      "categoryName": "Robert Brown",
      
  
      "video": 2,
      "createdAt": "April 5th 2024"
    },
    {
      "id": "5",
      "categoryName": "Emily Davis",
    

      "video": 4,
      "createdAt": "May 10th 2024"
    }
  ]
const Category = () => {
    return (
        <div>
            <CategoryClient data={dummy}/>
        </div>
    )
}

export default Category
