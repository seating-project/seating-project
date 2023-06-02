'use client'; // Error components must be Client components
import '../../../../../../styles/globals.css';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center' >
      <div className='flex flex-col items-center justify-center bg-white mt-40 p-6 rounded-lg shadow-lg hover:box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; transition backdrop-blur-lg py-20 px-10' >
      <h2 className='font-mono font-bold text-6xl  mb-10 text-red-500'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='bg-[#6666FF] hover:bg-white text-3xl text-white mt-10 hover:text-[#6666FF] hover:border-[#6666FF] hover:border-2 transition font-mono font-bold py-2 px-4 rounded'
      >
        Try again
      </button>
      <button
        onClick={
            // Attempt to go back one route
            () => window.history.back()
        }
        className='bg-[#6666FF] hover:bg-white text-3xl text-white mt-4 hover:text-[#6666FF] hover:border-[#6666FF] hover:border-2 transition font-mono font-bold py-2 px-4 rounded '
      >
        Go Back
      </button>
      </div>
    </div>
  );
}