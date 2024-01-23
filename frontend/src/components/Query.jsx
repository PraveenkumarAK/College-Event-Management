import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Query({listing}) {
    const [querys, setQuerys] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
      setMessage(e.target.value);
    };
  
    useEffect(() => {
      const fetchQuerys  = async () => {
        try {
          const res = await fetch(`/backend/user/${listing.userRef}`);
          const data = await res.json();
          setQuerys(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchQuerys();
    }, [listing.userRef]);
  return (
    <>
    {querys && (
      <div className='flex flex-col gap-2 text-white'>
        <p>
          Contact <span className='font-semibold'>{querys.username}</span>{' '}
          for{' '}
          <span className='font-semibold'>{listing.name.toLowerCase()}</span>
        </p>
        <textarea
          name='message'
          id='message'
          rows='2'
          value={message}
          onChange={onChange}
          placeholder='Enter your message here...'
          className='w-full border p-3 rounded-lg text-black'
        ></textarea>
        <div className='flex self-center'>
        <Link
        to={`mailto:${querys.email}?subject=Regarding ${listing.name}&body=${message}`}
        className='bg-transparent w-64  text-white text-xl font-medium p-2 cursor-pointer rounded-lg border border-white hover:bg-white duration-300 hover:text-black'
        >
          Send Message          
        </Link>
        </div>
      </div>
    )}
  </>
  )
}
