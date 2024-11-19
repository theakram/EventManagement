import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useFormik } from 'formik';

const ContactUs = () => {
    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 600,
            easing: "ease-in-sine",
            delay: 100,
        });
    }, []);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        onSubmit: (values) => {
            if (!values.name || !values.email || !values.subject || !values.message) {
                toast.error('Something went wrong. Please try again.');
                return;
            }

            if (!values.email.includes("@gmail.com")) {
                toast.error("Enter a valid email address");
                return;
            }


            fetch('https://formspree.io/f/mqkrjdnv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.ok) {
                        toast.success('Thank you for contacting us. We will get back to you soon!');
                        formik.resetForm();
                    } else {
                        toast.error('Something went wrong. Please try again.');
                    }
                })
                .catch((error) => {
                    toast.error('Something went wrong. Please try again.');
                });

        }
    });


    function handleForm(data) {
        // Simulate a call to the backend API
        // You should replace this with an actual API call
        fetch('https://formspree.io/f/mqkrjdnv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.ok) {
                    toast.success('Thank you for contacting us. We will call you soon!');
                    reset();
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            })
            .catch((error) => {
                toast.error('Something went wrong. Please try again.');
            });
    }

    return (
        <section data-aos="fade-up" className="flex flex-col items-center py-8 sm:py-10 bg-[#FFFBFB]">
            <ToastContainer />
            <h1 className='text-center font-semibold text-2xl sm:text-4xl uppercase'>Contact Us</h1>
            <h4 className='text-zinc-400 text-md w-[70%] text-center sm:text-xl my-4 capitalize'>Feel Free to contact us. Get your doubts clarified.</h4>
            <div className='w-16 h-1.5 bg-[#FF5880]'></div>

            <div className='w-screen flex flex-col items-center gap-10 pt-4 sm:pt-12'>

                <div className='w-full sm:w-[72%] flex flex-col items-center sm:flex-row'>
                    <div className='w-1/2 text-center sm:w-1/3 border-b-2 sm:border-r-2 sm:border-b-0 border-zinc-300 flex flex-col py-8 gap-3 items-center justify-center '>
                        <h1 className='uppercase font-bold text-lg'>Address</h1>
                        <h4 className='text-md'> 404 Adam Street, Lucknow, UP 2260020, India </h4>
                    </div>
                    <div className='w-1/2 text-center sm:w-1/3 flex flex-col py-8 gap-3 items-center justify-center'>
                        <h1 className='uppercase font-bold text-lg'>phone number</h1>
                        <a href='tel:+155895548855' className='text-md text-blue-700 hover:text-red-500 transition-transform transform duration-500'>+1 5589 55488 55</a>
                    </div>
                    <div className='w-1/2  text-center sm:w-1/3   border-t-2 sm:border-l-2 sm:border-t-0 border-zinc-300 flex flex-col py-8 gap-3 items-center justify-center'>
                        <h1 className='uppercase font-bold text-lg'>Email</h1>
                        <a href='mailto:info@example.com' className='text-md text-blue-700 hover:text-red-500 transition-transform transform duration-500' >info@example.com</a>
                    </div>
                </div>

                <form className='w-[72%] text-center' autoComplete='off' onSubmit={formik.handleSubmit} >

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between'>
                            <input type="text" placeholder='Your Name' value={formik.values.name} onChange={formik.handleChange} name='name' className='border w-full mr-3 border-zinc-300 placeholder-gray-500 px-3 py-2 focus:outline-none  focus:border-blue-400 text-md text-zinc-600' />
                            <input type="text" placeholder='Your Email' value={formik.values.email} name='email' onChange={formik.handleChange} className='border w-full border-zinc-300 placeholder-gray-500 px-3 py-2 focus:outline-none  focus:border-blue-400 text-md text-zinc-600' />
                        </div>
                        <input type="text" placeholder='Subject' value={formik.values.subject} name='subject' onChange={formik.handleChange} className='border border-zinc-300 placeholder-gray-500 px-3 py-2 focus:outline-none  focus:border-blue-400 text-md text-zinc-600' />
                        <textarea name="message" id="message" rows="5" placeholder='Message' value={formik.values.message} onChange={formik.handleChange} className='border border-zinc-300 placeholder-gray-500 px-3 py-2 focus:outline-none focus:border-blue-400 text-md text-zinc-600'  ></textarea>
                    </div>

                    <input type="submit" className='bg-[#FF5880] rounded-full px-10 py-2 mt-4 text-white text-lg hover:bg-[#ec4d72] font-semibold cursor-pointer' value="Send Message" />
                </form>
            </div>
        </section>
    )
}

export default ContactUs;