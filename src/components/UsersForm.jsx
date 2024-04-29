import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({ getUser, userSelected, desSelect, Toaster, toast }) => {

    const clearInput = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: ""
    }

    const { handleSubmit, register, reset } = useForm();

    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        } else {
            reset(clearInput)
        }
    }, [userSelected])

    const submit = (data) => {
        if (userSelected) {
            axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
                .then(() => {
                    getUser()
                    desSelect()
                    toast.success("successful update", { duration: 2000 })  
                })
                .catch(error => console.log(error.response?.data))
        } else {
            axios.post('https://users-crud.academlo.tech/users/', data)
                .then(() => {
                    getUser()
                    reset(clearInput)
                    toast.success("user created successfully", { duration: 2000 })
                })
                .catch(error => console.log(error.response?.data))
        }

    }


    const [isVisible, setIsVisible] = useState(false)

    const btnPassword = () => {
        setIsVisible(!isVisible)
    }

    return (
        <form action="" onSubmit={handleSubmit(submit)}>

            <div className="all-input">
                <h1>New User</h1>
                <div className="name-and-lastname">
                    <div className="input-container">
                        <label htmlFor="first_name"><i className="fa-solid fa-user"></i></label>
                        <input className='duo-name-lastname' type="text" id='first_name' {...register('first_name')} placeholder="First_name" />
                    </div>
                    <div className="input-container">
                        <label className='label-lastname' htmlFor="last_name"> </label>
                        <input className='duo-name-lastname' type="text" id='last_name' {...register('last_name')} placeholder="Last_name" />
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
                    <input type="email" id='email' {...register('email')} placeholder="Email" />
                </div>
                <div className="input-container">
                    <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>
                    <input className='btn-visible' type={isVisible ? "text" : "password"} id='password'  {...register('password')} placeholder="Password" />
                    <button type='button' onClick={() => btnPassword()}>
                        {isVisible ?
                            <i className="fa-solid fa-eye-slash"></i> :
                            <i className="fa-solid fa-eye"></i>
                        }
                    </button>
                </div>
                <div className="input-container">
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
                    <input type="date" id='birthday' {...register('birthday')} />
                </div>
                <div className="btn-upload-and-cancel">
                    <div className="duo">
                        <button>
                            Upload
                        </button>
                        {
                            userSelected && (
                                <button className='cancel-upadate' type='button' onClick={() => desSelect()}>
                                    Cancel
                                </button>
                            )
                        }
                        <Toaster toastOptions={{
                            style: {
                                padding: "20px",
                                fontSize: "20px",
                            }
                        }} />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UsersForm;