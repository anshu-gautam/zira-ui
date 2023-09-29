export default function Details({ project }) {
  return (
    <section className='flex justify-between px-16 py-10 w-full'>
      <div className='space-y-4 w-full'>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Name</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            defaultValue={project?.name}
            type='text'
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Identifier</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            defaultValue={project?.identifier}
            type='text'
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Desc</p>
          <input
            autoComplete='off'
            className='py-1 px-2 w-1/3 border border-black rounded-md outline-none ring-offset-1 focus:ring-1 focus:ring-blue-300 transition-all duration-300'
            placeholder='Project name'
            defaultValue={project?.desc}
            type='text'
          />
        </div>
        <div className='flex justify-between items-end w-full'>
          <p className='font-bold text-lg w-2/3'>Created at</p>
          <p className='text-sm text-gray-500 w-1/3'> {project?.createdAt}</p>
        </div>
        <div className='w-full flex space-x-4 items-center justify-end'>
          <button className='border border-red-500 font-medium duration-300 rounded px-3 py-2 text-xs bg-transparent text-red-500 hover:bg-red-500 hover:text-white'>
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
    </section>
  );
}
