import { Square3Stack3DIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <section className='p-10'>
      <div className='font-mono  font-bold mb-2 text-xl '>
        <h2>Good Morning john Doe</h2>
        <p>Tuesday, Oct 3 </p>
      </div>
      <div className='grid grid-cols-5 gap-4'>
        <div className='p-5 shadow-md rounded-xl flex flex-col items-center space-y-3 bg-[#e0ebf2]'>
          <div className='rounded-full bg-white p-1'>
            <Square3Stack3DIcon className='h-8 w-8 ' />
          </div>
          <p className='text-xl font-normal'>5</p>
          <p className='text-sm font-normal text-gray-600'>Projects</p>
        </div>
        <div className='p-5 bg-[#cfcbc9] shadow-md rounded-xl flex flex-col items-center space-y-3'>
          <div className='rounded-full bg-white p-1'>
            <Square3Stack3DIcon className='h-8 w-8  ' />
          </div>
          <p className='text-xl font-medium'>87 of 100</p>
          <p className='text-sm font-normal text-gray-600  '>Deliveries</p>
        </div>
        <div className='p-5 bg-[#d3e1e0] shadow-md rounded-xl flex flex-col items-center space-y-3'>
          <div className='rounded-full bg-white p-1'>
            <Square3Stack3DIcon className='h-8 w-8 ' />
          </div>{' '}
          <p className='text-3xl font-medium'>10,232,945</p>
          <p className='text-sm font-normal text-gray-600'>Actual</p>
        </div>
        <div className='p-5 bg-[#e1dacd] shadow-md rounded-xl flex flex-col items-center space-y-3'>
          <div className='rounded-full bg-white p-1'>
            <Square3Stack3DIcon className='h-8 w-8 ' />
          </div>
          <p className='text-3xl font-medium'>70,543,543</p>
          <p className='text-sm font-norma text-gray-600'>ARR Potential</p>
        </div>
        <div className='p-5 bg-[#d6d7dc] shadow-md rounded-xl flex flex-col items-center space-y-3'>
          <div className='rounded-full bg-white p-1'>
            <Square3Stack3DIcon className='h-8 w-8 ' />
          </div>
          <p className='text-3xl font-medium'>105,856,486</p>
          <p className='text-sm font-normal text-gray-600'>
            Aggregated Potential
          </p>
        </div>
      </div>
      <section className='flex space-x-6 mt-16'>
        <section>
          <header className='text-3xl font-medium mb-4'>
            Recent activities
          </header>
          <table className='border-collapse border border-slate-400 bg-white shadow-lg'>
            <thead>
              <tr>
                <th className='border border-slate-300 p-2'>Activity</th>
                <th className='border border-slate-300 p-2'>When</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-slate-300 p-4'>
                  John created ticket under project PT
                </td>
                <td className='border border-slate-300 p-4'>
                  {new Date().toDateString()}
                </td>
              </tr>
              <tr>
                <td className='border border-slate-300 p-4 '>
                  Sam updated the priority of the ticket PT09
                </td>
                <td className='border border-slate-300 p-4'>
                  {new Date().toDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <header className='text-3xl font-medium mb-4'>Recent tickets</header>
          <ul className='bg-white'>
            <li className='p-4 border tracking-wider'>
              Add a page for tickets - high-priority
            </li>
            <li className='p-4 border tracking-wider'>
              List all the tickets - high-priority
            </li>
            <li className='p-4 border tracking-wider'>
              Add a page for projects - high-priority
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
}
