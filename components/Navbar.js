import Link from 'next/link';
import {
  Squares2X2Icon,
  NewspaperIcon,
  TicketIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className='flex flex-col justify-between space-y-5 p-3 bg-gray-800 shadow items-center'>
      <nav className='py-3 flex flex-col space-y-5'>
        <Link
          href='/'
          className='max-w-min p-2 text-white tracking-wider hover:bg-gray-900 transition'
        >
          <Squares2X2Icon className='h-8 w-8' />
        </Link>
        <Link
          href='/tickets'
          className='max-w-min p-2 text-white tracking-wider hover:bg-gray-900 transition'
        >
          <TicketIcon className='h-8 w-8' />
        </Link>
        <Link
          href='/projects'
          className='max-w-min p-2 text-white tracking-wider hover:bg-gray-900 transition'
        >
          <NewspaperIcon className='h-8 w-8' />
        </Link>
      </nav>
      <div className='flex items-center'>
        <button className='hover:bg-gray-900 text-white p-2'>
          <PowerIcon className='h-8 w-8' />
        </button>
      </div>
    </div>
  );
}
