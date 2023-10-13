import { useState } from 'react';
import axios from 'axios';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { getAuthToken } from '../../utils/auth';
import { Modal } from '../shared';

export default function Estimate({ estimates, refetch, projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeState, setActiveState] = useState(null);
  const [newEstimate, setNewEstimate] = useState({});

  const handleEdit = (estId) => {
    setIsModalOpen(true);
    setActiveState(estimates.find((estimate) => estimate._id === estId));
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `estimates/${activeState._id}`,
        {
          ...activeState,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      refetch();
      toast.success('Estimates updated sucessfully');
      setActiveState(null);
      closeModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        'estimates',
        {
          ...newEstimate,
          project: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      refetch();
      toast.success('Estimate created sucessfully');
      setNewEstimate({});
      closeCreateModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    setActiveState({ ...activeState, [e.target.name]: e.target.value });
  };

  const handleChangeForCreate = (e) => {
    setNewEstimate({ ...newEstimate, [e.target.name]: e.target.value });
  };

  const closeModal = () => setIsModalOpen(false);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div>
      <div className='flex justify-end items-center'>
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
          className='flex w-fit space-x-2 items-center justify-end border mb-2 border-gray-500 text-gray px-3 py-2 rounded font-medium duration-300 text-xs hover:bg-gray-800 hover:text-white'
        >
          <PlusIcon className='h-4 w-4' />
          <spnn>Add new</spnn>
        </button>
      </div>
      <table className='border-collapse border w-full border-slate-400 bg-white'>
        <thead>
          <tr>
            <th className='text-left border border-slate-300 p-2'>Value</th>
            <th className='text-left border border-slate-300 p-2'></th>
          </tr>
        </thead>
        <tbody>
          {estimates?.map(({ _id, value }) => (
            <tr key={_id}>
              <td className='border border-slate-300 p-2'>{value}</td>
              <td className='border border-slate-300 p-2 w-32'>
                <div className='flex space-x-1 items-center justify-around'>
                  <PencilIcon
                    className='h-4 w-4 hover:scale-110 cursor-pointer'
                    onClick={() => handleEdit(_id)}
                  />
                  <TrashIcon className='h-4 w-4 hover:scale-110 cursor-pointer' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title='Edit estimate' isOpen={isModalOpen} closeModal={closeModal}>
        <form className='mt-4 flex  flex-col' onSubmit={handleUpdate}>
          <input
            type='text'
            value={activeState?.value}
            placeholder='Value'
            name='value'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChange}
          />
          <footer className='flex justify-end'>
            <button
              type='submit'
              className='justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              Update
            </button>
          </footer>
        </form>
      </Modal>
      <Modal
        title='Create estimate'
        isOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
      >
        <form className='mt-4 flex  flex-col' onSubmit={handleCreate}>
          <input
            type='number'
            value={newEstimate?.value}
            placeholder='Value'
            name='value'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChangeForCreate}
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
