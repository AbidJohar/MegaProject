import React from 'react'
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import { PostCard } from '../components'
import appwriteService from '../appwrite/restServices'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import ReactLoading from 'react-loading'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        console.log("User Data:", userData);
        if (userData) {
            setLoading(true);
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
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [userData]);



    return loading ? (
        <div className='flex items-center justify-center w-full h-screen'>
            <ReactLoading
                type={"bars"}
                color={"#00ffff"}
                height={100}
                width={100}
            />
        </div>
    )

        : (
            <div className='w-full h-screen py-8'>
                <Container>
                    <div className='flex flex-wrap gap-[0.4rem'>
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
