import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/restServices";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import postSlicer from "../features/post/postSlicer";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                 dispatch(clearPost(post.$id));
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-4">
            <Container>
                <div className="max-w-full flex justify-between mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[60%] h-96 "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button
                                    className="w-full uppercase rounded-full shadow-xl shadow-black/15  text-green-500 bg-transparent border-[1.5px] border-green-500 px-16 transition-colors py-3  hover:bg-green-500 hover:text-white before:bg-green-500  before:transition-transform hover:border-gray-300 hover:rounded-full mb-6 font-semibold">
                                    Edit
                                </button>

                            </Link>
                            <button className="w-full uppercase shadow-xl shadow-black/15 rounded-full font-semibold  text-red-500 bg-transparent border-[1.5px] border-red-500 px-16 transition-colors py-3  hover:bg-red-500 hover:text-white before:bg-red-500  before:transition-transform hover:border-gray-300 hover:rounded-full" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;

}