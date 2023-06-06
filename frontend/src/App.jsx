import './index.css';
import sqlServer from './assets/sql-server.png';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const App = () => {
  const backendUrl = import.meta.env.VITE_API_URL;
  const [userPrompt, setUserPrompt] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const query = await generateQuery();
      setSqlQuery(query);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const generateQuery = async () => {
    try {
      const response = await axios.post(
        backendUrl,
        {
          queryDescription: userPrompt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      return data.sqlQuery.trim();
    } catch (error) {
      throw new Error('Failed to generate query');
    }
  };

  return (
    <div className='flex flex-col items-center pt-20 text-gray-700 font-normal bg-neutral-200 h-screen'>
      <img src={sqlServer} alt='SQL' className='w-12' />
      <h3 className='text-4xl leading-10 font-bold text-gray-800 my-4'>
        Generate SQL
      </h3>
      <form className='flex flex-col w-80' onSubmit={onSubmit}>
        <input
          type='text'
          name='query-description'
          placeholder='Describe your query'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className='border border-teal-500 px-4 py-3 rounded-md mb-5 outline-teal-500 placeholder-gray-500 focus:bg-gray-200'
        />
        <input
          type='submit'
          value='Generate query'
          className='px-4 py-3 text-white bg-teal-500 rounded-md text-center cursor-pointer'
        />
      </form>
      <div className='mt-5 max-w-screen-lg'>
        <div className='border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto'>
          <pre className='whitespace-pre-wrap break-words'>{sqlQuery}</pre>
        </div>
      </div>
    </div>
  );
};

export default App;
