import React from 'react'
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import { PostCard } from '../components'
import appwriteService from '../appwrite/restServices'

function AllPosts() {
      const[posts, setPosts] = useState([]);

      useEffect(()=>{
          appwriteService.getPosts([])
          .then((posts)=> {
            console.log(posts.documents);
            if(posts){
                setPosts(posts.documents);
            }
          })

      },[])

  return (
    <div className=' w-full py-8'>
      <Container>
        <div className='flex flex-wrap gap-3'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                   <PostCard  post={post} />
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
