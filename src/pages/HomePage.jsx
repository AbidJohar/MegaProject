import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/restServices'
import Container from '../components/container/Container'
import { PostCard } from '../components/index'
import wallpaperImage from '../assets/wallpaper.jpg'
import { Link } from 'react-router-dom'


function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })

    }, [])

    if (posts.length > 0) {
        return <div className='w-full h-screen py-8'>
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
    }
    return <div className='w-full h-screen mt-auto'>
           <div className={`h-screen w-full flex items-end  justify-start`}
            style={{ backgroundImage: `url(${wallpaperImage})`, width: 'full', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Link to={'/signup'}>
            <button className="border-2 hover:bg-gradient-to-r from-[#0A5455] to-[#72D2F3] mb-32 ml-10 text-white font-bold py-4 px-8 rounded">
                SignUp to Read Posts
            </button>
            </Link>
              
        </div>
    </div>
}

export default HomePage
