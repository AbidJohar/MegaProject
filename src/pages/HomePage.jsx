import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/restServices';
import Container from '../components/container/Container';
import { PostCard } from '../components/index';
import wallpaperImage from '../assets/wallpaper.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading'

function HomePage() {
    const authStatus = useSelector((state) => state.auth.status);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await appwriteService.getPosts();
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return   <div className='flex items-center justify-center w-full h-screen'>
        <ReactLoading
            type={"bars"}
            color={"#00ffff"}
            height={100}
            width={100}
        />
    </div>
    }

    return posts.length > 0 && authStatus ? (
        <div className='w-full h-screen py-8'>
            <Container>
                <div className='flex flex-wrap gap-[1.6rem] ml-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/6 '>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        <div className='w-full h-screen mt-auto'>
            <div
                className={`h-screen w-full flex items-end justify-start`}
                style={{
                    backgroundImage: `url(${wallpaperImage})`,
                    width: 'full',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Link to={'/signup'}>
                    <button className="border-2 hover:bg-gradient-to-r from-[#0A5455] to-[#72D2F3] mb-32 ml-10 text-white font-bold py-4 px-8 rounded">
                        SignUp to Read Home's Posts
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
