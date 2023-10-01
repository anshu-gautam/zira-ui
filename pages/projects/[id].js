import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Details from '../../components/project/details';
import { getAuthToken } from '../../utils/auth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TABS = ['Details', 'States', 'Estimates'];

export default function ShowProject({ id }) {
  const [data, setData] = useState({});

  const fetchProject = async () => {
    try {
      const response = await axios.get(`projects/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setData(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <section className='w-full px-8'>
      <div className='w-full px-2 py-16 sm:px-0'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded bg-gray-700 p-1'>
            {TABS.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-white hover:bg-gray-100'
                      : 'text-white hover:bg-gray-900 hover:text-white'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
              )}
            >
              <Details project={data.project} />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              States here
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              Estimates here
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { id } };
}
