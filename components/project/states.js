import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { getAuthToken } from '../../utils/auth';
import { Modal } from '../shared';

import toast from 'react-hot-toast';

export default function State({ states, refetch, projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeState, setActiveState] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newState, setNewState] = useState({});

  const handleEdit = (stateId) => {
    setIsModalOpen(true);
    setActiveState(states.find((state) => state._id === stateId));
  };

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        'states',
        {
          ...newState,
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
      setNewState({});
      closeCreateModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `states/${activeState._id}`,
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
      toast.success('State updated successfully');
      setActiveState(null);
      closeModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    setActiveState({ ...activeState, [e.target.name]: e.target.value });
  };
  const handleChangeForCreate = (e) => {
    setNewState({ ...newState, [e.target.name]: e.target.value });
  };

  const closeModal = () => setIsModalOpen(false);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className='w-full'>
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
      <table className='w-full border-collapse border border-slate-400 bg-white'>
        <thead>
          <tr>
            <th className='text-left border border-slate-300 p-2'>Name</th>
            <th className='text-left border border-slate-300 p-2'>
              Description
            </th>
            <th className='text-left border border-slate-300 p-2'>Color </th>
            <th className='text-left border border-slate-300 p-2'></th>
          </tr>
        </thead>
        <tbody>
          {states?.map(({ _id, name, description, color }) => (
            <tr key={_id}>
              <td className='border border-slate-300 p-2'>{name}</td>
              <td className='border border-slate-300 p-2'>{description}</td>
              <td className='border border-slate-300 p-2'>{color}</td>
              <td className='border border-slate-300 p-2'>
                <div className='flex space-x-1 items-center justify-evenly'>
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

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Edit state
                  </Dialog.Title>
                  <form className='mt-4 flex  flex-col' onSubmit={handleUpdate}>
                    <input
                      type='text'
                      value={activeState?.name}
                      placeholder='state name'
                      name='name'
                      className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      value={activeState?.description}
                      placeholder='state description'
                      name='description'
                      className='py-1 px-2 mb-5 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      value={activeState?.color}
                      placeholder='state color'
                      name='color'
                      className='py-1 px-2 mb-5 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
                      onChange={handleChange}
                    />
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Update
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Modal
        title='Create state'
        isOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
      >
        <form className='mt-4 flex  flex-col' onSubmit={handleCreate}>
          <input
            type='text'
            value={newState?.value}
            placeholder='Name'
            name='Name'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChangeForCreate}
          />
          <input
            type='text'
            value={newState?.description}
            placeholder='Description'
            name='Description'
            className='py-1 px-2 mb-5  border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            onChange={handleChangeForCreate}
          />
          <input
            type='text'
            value={newState?.color}
            placeholder='Color'
            name='Color'
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
