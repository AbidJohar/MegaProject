import React from 'react'
import restServices from '../appwrite/restServices'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
 const  {$id, title, featuredImage} = post
  console.log("FeaturedImage from PostCard:", featuredImage);

  const getImageUrl = () => {
    try {
      return featuredImage ? restServices.getFilePreview(featuredImage) : null;
    } catch (error) {
      console.error("Error fetching image preview:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl();
   return (
    <Link to={`/post/${$id}`}>
    <div className="w-full  h-fit bg-transparent shadow-md border-[1px] border-gray-500 flex-row rounded-md p-2 hover:scale-105 hover:duration-1000 hover:transition-all hover:shadow-lg">
      <div className="mb-5 h-32 w-[141px] border-[1px] border-gray-500 overflow-hidden rounded-md">
          <img 
            src={imageUrl} 
            alt={title}
            className="h-32 w-36 bg-cover " 
            
          />
      </div>
      <div className='w-full flex items-center justify-center'>
      <h2 className="text-sm inline-block font-bold pb-2">{title}</h2>
      </div>
    </div>
  </Link>
  //   <Link to={`/post/${$id}`} className="block">
  //   <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
  //     <div className="relative pb-2/3">
  //       <img 
  //         src={imageUrl} 
  //         alt={title}
  //         className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
  //       />
  //     </div>
  //     <div className="p-4">
  //       <h2 className="text-2xl font-semibold text-gray-800 truncate">{title}</h2>
  //     </div>
  //   </div>
  // </Link>
  );
}

export default PostCard
