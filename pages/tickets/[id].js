import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

import Editor from '../../components/shared/editor';
import { getAuthToken } from '../../utils/auth';

export default function ShowTicket({ id }) {
  const [ticket, setTicket] = useState(null);

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setTicket(response.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (!ticket) {
    return <div>Ticket data not found!</div>;
  }

  return (
    <section className='px-8 py-10 w-full max-h-full overflow-y-auto'>
      <header className='text-3xl mb-4'>{ticket.title}</header>
      <div className='border border-gray-400 rounded max-w-4xl'>
        <Editor content={ticket.description} editable={false} />
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { id } };
}
