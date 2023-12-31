import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAuthToken } from '../../utils/auth';
import toast from 'react-hot-toast';

export default function Details({ project }) {
  const [formData, setFormData] = useState(project);

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `projects/${project._id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      toast.success('Project updated successfully!');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(project);
  }, [project]);

  return (
    <form
      className='flex justify-between px-16 py-10 w-full'
      onSubmit={updateForm}
    >
      <div className='space-y-4 w-full'>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Name</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            name='name'
            value={formData?.name}
            type='text'
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Identifier</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            name='identifier'
            value={formData?.identifier}
            type='text'
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Desc</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            value={formData?.desc}
            name='desc'
            type='text'
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Created at</p>
          <p className='text-sm text-gray-500 w-1/3'> {formData?.createdAt}</p>
        </div>
        <div className='w-full flex space-x-4 items-center justify-end'>
          <button
            type='button'
            className='border border-red-500 font-medium duration-300 rounded px-3 py-2 text-xs bg-transparent text-red-500 hover:bg-red-500 hover:text-white'
          >
            Delete Project
          </button>
          <button
            className='border border-gray-500 text-gray px-3 py-2 rounded font-medium duration-300 text-xs  hover:bg-gray-900 hover:text-white'
            type='submit'
          >
            Update Project
          </button>
        </div>
      </div>
    </form>
  );
}
