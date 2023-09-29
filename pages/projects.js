import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';
import Link from 'next/link';

export default function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('projects', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log(data);
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
      <header className='text-3xl font-medium mb-4'>Projects</header>
      <table className='border-collapse border border-slate-400 bg-white shadow-lg'>
        <thead>
          <tr>
            <th className='text-left border border-slate-300 p-2'>Project</th>

            <th className='text-left border border-slate-300 p-2'>Desc</th>
            <th className='text-left border border-slate-300 p-2'>
              Identifier
            </th>
            <th className='text-left border border-slate-300 p-2'>
              Created by
            </th>
            <th className='text-left border border-slate-300 p-2'>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            <tr key={project._id}>
              <td className='border border-slate-300 p-2 underline text-blue-700'>
                <Link href={`/projects/${project._id}`}>{project.name}</Link>
              </td>

              <td className='border border-slate-300 text-blue-700 underline p-2'>
                <Link href={`/projects/${project._id}`}>{project.desc}</Link>
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
    </div>
  );
}
