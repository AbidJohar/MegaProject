import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Select from '../Select';
import appwriteService from "../../appwrite/restServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import { makePost } from '../../features/post/postSlicer';
import ReactLoading from 'react-loading';

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            setLoading(true);
            console.log("data", data);
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                console.log(file);
                if (file) {
                    const fileId = file.$id;
                    console.log("File ID is:", fileId);
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    console.log("DataBase post:", dbPost);
                    if (dbPost) {
                        dispatch(makePost(dbPost));
                        navigate('/');    ///post/${dbPost.$id}
                    }
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return loading ? (
        <div className='flex items-center justify-center w-full h-screen'>
            <ReactLoading
                type={"bars"}
                color={"#00ffff"}
                height={100}
                width={100}
            />
        </div>
    ) : (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <label className="block mb-1">Content :</label>
                <textarea
                    placeholder="Write content here..."
                    className="mb-4 p-2 border rounded-lg w-full outline-none focus:border-[1.5px] focus:border-blue-600"
                    {...register("content", { required: true })}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <button type="submit" className="w-full rounded-lg py-2 bg-blue-600 shadow-md">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}
