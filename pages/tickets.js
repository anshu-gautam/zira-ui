import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Modal } from '../components/shared';
import toast from 'react-hot-toast';
import Editor from '../components/shared/editor';

const PRIORITIES = ['low', 'medium', 'high', 'urgent'];

export default function Ticket() {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTicket, setNewTicket] = useState({});

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        'tickets',
        {
          ...newTicket,
          project: selectedProjectId,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      fetchTickets();
      toast.success('Ticket created sucessfully');
      setNewTicket({});
      closeModal();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setNewTicket({ ...newTicket, description: content });
  };

  const handleSelectedProject = (e) => {
    setSelectedProjectId(e.target.value);
    fetchSelectedProject();
  };

  const closeModal = () => setIsModalOpen(false);

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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('projects', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  const fetchSelectedProject = async () => {
    try {
      const response = await axios.get(`projects/${selectedProjectId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setSelectedProject(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }
    fetchSelectedProject();
  }, [selectedProjectId]);

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
      <Modal
        title='Create Ticket'
        isOpen={isModalOpen}
        closeModal={setIsModalOpen}
        maxWidth='max-w-6xl'
      >
        <form className='mt-4 flex flex-col' onSubmit={handleCreate}>
          <input
            type='text'
            value={newTicket?.title}
            placeholder='Name'
            name='title'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          />
          {projects.length > 0 && (
            <select
              name='project'
              className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              onChange={handleSelectedProject}
            >
              <option selected disabled>
                Choose a project
              </option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          )}
          {selectedProject?.states?.length > 0 && (
            <select
              name='state'
              className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              onChange={handleChange}
            >
              <option selected disabled>
                Choose a state
              </option>
              {selectedProject?.states?.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          )}
          {selectedProject?.estimates?.length > 0 && (
            <select
              name='estimates'
              className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
              onChange={handleChange}
            >
              <option selected disabled>
                Choose a estimate
              </option>
              {selectedProject?.estimates?.map((estimate) => (
                <option key={estimate._id} value={estimate.value}>
                  {estimate.value}
                </option>
              ))}
            </select>
          )}
          <select
            name='priority'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          >
            <option selected disabled>
              Choose a priority
            </option>
            {PRIORITIES?.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <div className='mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'>
            <Editor
              content='Add your description'
              onChange={handleDescriptionChange}
            />
          </div>
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
