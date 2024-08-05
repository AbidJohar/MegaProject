import React, { useState } from 'react'
import authService from '../appwrite/Auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlicer.js'
import Input from './Input.jsx'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo.jpg'
import ReactLoading from 'react-loading'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            setLoading(true);
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
                setLoading(false);

            }
        } catch (error) {
            console.log("Error at client side:", error);
            setError(error.message)
        }
    }

    return loading ? (<div className='flex items-center justify-center  w-full h-screen'>
        <ReactLoading
            type={"bars"}
            color={"#00ffff"}
            height={100}
            width={100}
        />
    </div>)
        :
        (
            <div className="flex items-center justify-center">
                <div className={`mx-auto w-full px-5 max-w-lg bg-gray-100 rounded-xl pb-6 pt-1 border border-black/20`}>
                    <div className="flex justify-center">
                        <img src={logo} width={100} height={100} />
                    </div>
                    <h2 className="text-center text-xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <button type="submit" className=" w-full py-2 px-10 bg-blue-400 rounded-md ">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        )
}

export default Signup