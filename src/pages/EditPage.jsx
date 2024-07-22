import React from 'react'
import appwriteService from '../appwrite/restServices'
import { useNavigate,useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
function EditPage() {
    const [post, setPost] = useState();
   const {slug} = useParams();
   const navigate = useNavigate();
     useEffect(()=>{
        if(slug){
        appwriteService.getPost(slug)
        .then((post)=>{
             if(post){
                setPost(post);
             }
             else{
                navigate('/')
             }
        })
    }

     },[])

 return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
 ) : null
}

export default EditPage
