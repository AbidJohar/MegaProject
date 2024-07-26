import React from 'react'
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import { PostCard } from '../components'
import appwriteService from '../appwrite/restServices'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function AllPosts() {
      const[posts, setPosts] = useState([]);

      const userData = useSelector((state)=> state.auth.userData);
        useEffect(() => {
          console.log("User Data:", userData);
          if (userData) {
              appwriteService.getPosts([
                Query.equal("userId", userData.$id)
              ])
                  .then((posts) => {
                      console.log(posts.documents);
                      if (posts) {
                          setPosts(posts.documents);
                      }
                  })
                  .catch((error) => {
                      console.error("Error fetching posts:", error);
                  });
          }
      }, [userData]);

  return (
    <div className='w-full h-screen py-8'>
    <Container>
        <div className='flex flex-wrap gap-1'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/6'>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    </Container>
</div>
  )
}

export default AllPosts
