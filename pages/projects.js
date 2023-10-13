import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Modal } from '../components/shared';
import toast from 'react-hot-toast';

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({});

  const closeModal = () => setIsModalOpen(false);

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        'projects',
        {
          ...newProject,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      fetchProjects();
      toast.success('Project created sucessfully');
      setNewProject({});
      closeModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('projects', {
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
    fetchProjects();
  }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <main className='w-full h-full flex items-center justify-center'>
        <p className='font-extrabold font-serif text-4xl'>No projects found</p>
      </main>
    );
  }

  return (
    <div className='pt-12 px-10 w-full h-full flex flex-col bg-gray-50'>
      <div className='flex justify-between items-center'>
        <header className='text-3xl font-medium mb-4'>Projects</header>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className='flex w-fit space-x-2 items-center justify-end border border-gray-500 text-gray px-3 py-2 rounded font-medium duration-300 text-xs hover:bg-gray-800 hover:text-white'
        >
          <PlusIcon className='h-4 w-4' />
          <span>Add new</span>
        </button>
      </div>
      <table className='border-collapse border border-slate-400 bg-white shadow-lg'>
        <thead>
          <tr>
            <th className='text-left border border-slate-300 p-2 w-56'>
              Project
            </th>

            <th className='text-left border border-slate-300 p-2'>
              Description
            </th>
            <th className='text-left border border-slate-300 p-2'>
              Identifier
            </th>
            <th className='text-left border border-slate-300 p-2 w-32'>
              Created by
            </th>
            <th className='text-left border border-slate-300 p-2 w-52'>
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            <tr key={project._id}>
              <td className='border border-slate-300 p-2 underline text-blue-700'>
                <Link href={`/projects/${project._id}`}>{project.name}</Link>
              </td>

              <td className='border border-slate-300 text-blue-700 underline p-2'>
                <Link href={`/projects/${project._id}`}>
                  {project.desc?.slice(0, 80)}
                </Link>
              </td>
              <td className='border border-slate-300 p-2'>
                {project.identifier}
              </td>
              <td className='border border-slate-300 p-2'>
                {project.owner.name}
              </td>
              <td className='border border-slate-300 p-2'>
                {new Date(project.createdAt).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title='Create Project'
        isOpen={isModalOpen}
        closeModal={setIsModalOpen}
      >
        <form className='mt-4 flex  flex-col' onSubmit={handleCreate}>
          <input
            type='text'
            value={newProject?.name}
            placeholder='Name'
            name='name'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          />
          <input
            type='text'
            value={newProject?.desc}
            placeholder='Description'
            name='desc'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          />
          <input
            type='text'
            value={newProject?.identifier}
            placeholder='Identifier'
            name='identifier'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          />

          <footer className='flex justify-end'>
            <button
              type='submit'
              className='justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              Create
            </button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}
