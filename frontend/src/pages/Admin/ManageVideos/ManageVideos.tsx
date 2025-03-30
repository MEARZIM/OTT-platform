import { Client } from "./components/client"


const dummy = [
  {
    "id": "1",
    "title": "Introduction to AI",
    "description": "An overview of artificial intelligence and its applications.",
    "rating": 4.5,
    "status": "PUBLISHED",
    "createdAt": "2024-03-29T10:00:00Z"
  },
  {
    "id": "2",
    "title": "Machine Learning Basics",
    "description": "Learn the fundamental concepts of machine learning.",
    "rating": 4.8,
    "status": "DRAFT",
    "createdAt": "2024-03-28T14:30:00Z"
  },
  {
    "id": "3",
    "title": "Deep Learning Explained",
    "description": "An introduction to deep learning architectures and techniques.",
    "rating": 4.7,
    "status": "PRIVATE",
    "createdAt": "2024-03-27T09:15:00Z"
  },
  {
    "id": "4",
    "title": "Data Science in Practice",
    "description": "Real-world applications of data science and analytics.",
    "rating": 4.6,
    "status": "BANNED",
    "createdAt": "2024-03-26T16:45:00Z"
  },
  {
    "id": "5",
    "title": "Cloud Computing for AI",
    "description": "How cloud platforms support AI and machine learning workloads.",
    "rating": 4.4,
    "status": "PUBLISHED",
    "createdAt": "2024-03-25T11:20:00Z"
  }
]


  



const ManageVideos = () => {
    return (
        <>
            <Client data={dummy} />
        </>
    )
}

export default ManageVideos
