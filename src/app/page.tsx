import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchbar';
import { NextFont } from 'next/dist/compiled/@next/font';

const inter : NextFont = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="relative bg-[#121212] h-screen overflow-hidden">
      <main>
        <Navbar />

        <div className='lg:mx-20 md:mx-16 mx-10'>
          <div className='mt-[10%]'>
            <div className='p-4 mb-5'>
              <div className='flex items-center'>
                <h1 className='text-white lg:text-7xl sm:text-5xl xs:text-3xl text-2xl font-bold'>Exactly the Music &nbsp;</h1>
                <h1 className='text-[#1DB954] lg:text-7xl sm:text-5xl xs:text-3xl text-2xl font-bold'>You Want</h1>
                <h1 className='text-white lg:text-7xl sm:text-5xl xs:text-3xl text-2xl font-bold'>, </h1>
              </div>
              <div className='flex items-center'>
                <h1 className='text-white lg:text-7xl sm:text-5xl xs:text-3xl text-2xl font-bold'> Exactly When &nbsp;</h1>
                <h1 className='text-[#1DB954] lg:text-7xl sm:text-5xl xs:text-3xl text-2xl font-bold'>You Want It</h1>
              </div>
            </div>
            <SearchBar/>
          </div>
        </div>
      </main>

      {/* Dark overlay at the bottom */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[#121212]"></div>
    </div>
  );
}
