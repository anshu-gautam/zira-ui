import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Ticket() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('tickets', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <main className='w-full h-full flex items-center justify-center'>
        <p className='font-extrabold font-serif text-4xl'>No tickets found</p>
      </main>
    );
  }

  return (
    <div className='pt-12 px-10 w-full h-full flex flex-col bg-gray-50'>
      <div className='flex justify-between items-center'>
        <header className='text-3xl font-medium mb-4'>Tickets</header>
        <button className='flex w-fit space-x-2 items-center justify-end border border-gray-500 text-gray px-3 py-2 rounded font-medium duration-300 text-xs hover:bg-gray-800 hover:text-white'>
          <PlusIcon className='h-4 w-4' />
          <span>Add new</span>
        </button>
      </div>
      <table className='border-collapse border border-slate-400 bg-white shadow-lg'>
        <thead>
          <tr>
            <th className='text-left border border-slate-300 p-2'>Ticket</th>
            <th className='text-left border border-slate-300 p-2'>State</th>
            <th className='text-left border border-slate-300 p-2'>Estimate</th>
            <th className='text-left border border-slate-300 p-2'>Priority</th>
            <th className='text-left border border-slate-300 p-2'>
              Created by
            </th>
            <th className='text-left border border-slate-300 p-2'>
              Created on
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket) => (
            <tr key={ticket._id}>
              <td className='border border-slate-300 p-2'>{ticket.title}</td>
              <td className='border border-slate-300 p-2'>
                {ticket.state.name}
              </td>
              <td className='border border-slate-300 p-2'>
                {ticket.estimates}
              </td>
              <td className='border border-slate-300 p-2'>{ticket.priority}</td>
              <td className='border border-slate-300 p-2'>
                {ticket.owner.name}
              </td>
              <td className='border border-slate-300 p-2'>
                {new Date(ticket.createdAt).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
