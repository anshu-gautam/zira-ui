import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('users', formData);
      Router.push('/signin');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center bg-gray-50'>
      <section className='px-20 py-10 shadow-lg rounded-lg border max-w-md w-full bg-white'>
        <h3 className='mb-6 text-lg font-medium text-center'>
          Register new account
        </h3>
        <form
          className='flex flex-col space-y-5 justify-start'
          onSubmit={handleSubmit}
        >
          <label>
            <input
              autoComplete='off'
              className='py-1 px-2 w-full border border-black outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              placeholder='Name'
              type='text'
              name='name'
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              autoComplete='off'
              className='py-1 px-2 w-full border border-black outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              placeholder='Email'
              type='email'
              name='email'
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              autoComplete='off'
              className='py-1 px-2 w-full border border-black outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              placeholder='Password'
              type='password'
              name='password'
              onChange={handleChange}
            />
          </label>
          <button type='submit' className='bg-gray-900 text-white py-2'>
            Submit
          </button>
        </form>
      </section>
      <Link href='/signin' className='mt-5'>
        Already have an account? Sign In
      </Link>
    </main>
  );
}
