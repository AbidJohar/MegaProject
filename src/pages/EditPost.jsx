import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/restServices';
import Container from '../components/container/Container';
import PostForm from '../components/post-form/PostForm';
import ReactLoading from 'react-loading';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate('/');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug, navigate]);

  if (loading) {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <ReactLoading
                type={"bars"}
                color={"#00ffff"}
                height={100}
                width={100}
            />
        </div>
    );
  }

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
