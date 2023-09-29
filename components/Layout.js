import Router from 'next/router';
import { getAuthToken } from '../utils/auth';
import Navbar from './Navbar';
import { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    if (!getAuthToken()?.length > 0) {
      Router.push('/signin');
    }
  }, []);

  return (
    <main className='w-screen h-screen flex'>
      <Navbar />
      <section className='bg-gray-50 w-full'>{children}</section>
    </main>
  );
}
