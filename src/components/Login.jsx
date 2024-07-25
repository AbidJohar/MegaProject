import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../features/auth/authSlicer';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import { useDispatch } from 'react-redux';
import authServices from '../appwrite/Auth';
import logo from '../assets/logo.jpg';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { isValid } } = useForm({
        mode: 'onChange'  // This enables validation on every change
    });
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        console.log(data);
        try {
            const session = await authServices.login(data);
            console.log(session);
            if (session) {
                const userData = await authServices.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            console.log("Original error:", error);
            console.log("Error message:", error.message);
            setError(error.message);
        }
    }

    // Watch the form fields
    const formValues = watch();

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg mt-4 bg-gray-100 rounded-xl px-5 pt-1 pb-7 mb-4 border border-black/30`}>
                <div className="flex justify-center">
                    <img src={logo} width={100} height={100} alt="Logo" />
                </div>
                <h2 className="text-center text-xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="email"
                            type="email"
                            placeholder="Enter the email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="password"
                            type="password"
                            placeholder="Enter the password"
                            {...register("password", {
                                required: "password is required",
                                validate:{
                                    matchPattern: (value) =>  /^\d{8}$/.test(value) ||
                                        "Code must be contaian 8 digits",
                                }
                           })}
                        />

                        <button
                            type="submit"
                            className={`w-full py-2 rounded-md shadow-md ${isValid ? 'bg-blue-600' : 'bg-gray-400'}`}
                            disabled={!isValid}
                        >Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
