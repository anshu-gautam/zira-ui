import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { getAuthToken } from '../utils/auth';

const projectId = '650c557eb1eaffa5974c4ffe';

const PRIORITY_COLOR_MAP = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-700',
};

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return <Droppable {...props}>{children}</Droppable>;
};

export default function Dnd() {
  const [winReady, setwinReady] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    setwinReady(true);
    fetchTickets();
    fetchProject();
  }, []);

  const handleOnDragEnd = async (result) => {
    if (!result?.destination?.droppableId) {
      toast.error('Please drop it in correct area!');
      return;
    }

    try {
      await axios.put(
        `tickets/${result.draggableId}`,
        {
          state: result.destination.droppableId,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      fetchTickets();
      toast.success('Ticket updated.');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get('tickets', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setTickets(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get(`projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setStates(response.data?.states);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const groupedTickets = {};

  tickets.forEach((ticket) => {
    const stateName = ticket.state.name;

    if (!groupedTickets[stateName]) {
      groupedTickets[stateName] = [];
    }

    groupedTickets[stateName].push({
      _id: ticket._id,
      title: ticket.title,
      estimates: ticket.estimates,
      priority: ticket.priority,
    });
  });

  return (
    <div className='p-10 w-full h-full flex flex-col bg-gray-50'>
      <section className='flex w-full space-x-3 mb-4'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {winReady &&
            states.map(({ _id, name }) => (
              <div
                style={{ width: `${100 / states.length}%` }}
                className='px-4 py-1 flex flex-col'
                key={_id}
              >
                <p className='mb-5 font-medium text-3xl'>{name}</p>
                <StrictModeDroppable key={name} droppableId={_id}>
                  {(provided) => (
                    <ul
                      className='space-y-4 max-w-xs h-[70vh]'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {groupedTickets[name]?.map(
                        ({ _id, title, priority, estimates }, index) => {
                          return (
                            <Draggable
                              key={_id}
                              draggableId={_id}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  className='px-4 py-2 bg-white flex flex-col justify-between shadow active:shadow-2xl hover:shadow-lg transition-shadow'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Link href={`/tickets/${_id}`}>
                                    <p className='tracking-wider mb-4'>
                                      {title}
                                    </p>
                                  </Link>
                                  <footer className='flex space-x-3 items-center'>
                                    <span
                                      className={`${PRIORITY_COLOR_MAP[priority]} shadow-md w-5 h-5 rounded-full`}
                                      title={priority}
                                    ></span>
                                    <span className='text-sm'>{estimates}</span>
                                    <span className='text-sm'>{name}</span>
                                  </footer>
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </StrictModeDroppable>
              </div>
            ))}
        </DragDropContext>
      </section>
    </div>
  );
}
