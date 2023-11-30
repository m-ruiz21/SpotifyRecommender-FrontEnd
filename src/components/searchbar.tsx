'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SearchBar = () => {
  const [searchContent, setSearchContent] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchContent.trim() !== '') {
      router.push(`/search/${encodeURIComponent(searchContent)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="relative">
        { /*eslint-disable-next-line @next/next/no-img-element */ } 
        <img
          src="/Magnifying Glass.png"
          alt="Magnifying Glass"
          width={500}
          height={500}
          className="absolute sm:left-5 left-3 opacity-95 top-1/2 transform -translate-y-1/2 lg:h-6 lg:w-6 h-4 w-4"
        />
        <input
          type="text"
          value={searchContent}
          onChange={handleInputChange}
          placeholder="What do you want to listen to?"
          className="w-full bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-full sm:py-4 py-2 sm:pl-16 sm:pr-8 pl-9 pr-4 lg:text-xl md:text-md sm:text-xs"
        />
      </div>
    </form>
  );
};

export default SearchBar;