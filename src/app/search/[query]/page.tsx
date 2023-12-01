import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/navbar';
import LoadingScreen from '../../../components/loading';
import { Song } from '../../../models/song';
import { extractBackgroundColor } from './utils';
import { Playlist } from '@/models/playlist';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [songs, setSongs] = useState<Song[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>(''); 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingSongs, setLoadingSongs] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/search/${query as string}`);
        const { data } = response;
        setSongs(data);
        setLoadingSongs(false);
      } catch (error: any) { 
        toast.error(error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (songs.length > 0) {
      extractBackgroundColor(songs[0].images[0].url, setBackgroundColor);
    }
  }, [songs]);

  const handleCarouselChange = (index: number) => {
    if (songs[index]) {
      extractBackgroundColor(songs[index].images[0].url, setBackgroundColor);
    }
  };

  const addSongs = async (songs: Song[]) => {
    // create object of type interface
    const playlist: Playlist = {
      name: query as string, 
      songs: songs,
    };    

    try {
      await axios.put<Playlist>('/api/playlists', playlist);

        toast.success("Successfully added playlist!", {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
    } catch (error) {
      toast.error('Error 500: Internal Server Failure', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <>
      {loadingSongs && <LoadingScreen />}

      {!loadingSongs && (
        <div className="min-h-screen" style={{
            background: `linear-gradient(to top, black, ${backgroundColor})`,
        }}>
          <Navbar />

        {/* Responsive Arrow Buttons for Larger Devices */}
        <div className="hidden md:flex mt-4 justify-between px-10 py-5">
          <button
            onClick={() => {
              const newSelectedIndex = selectedIndex > 0 ? selectedIndex - 1 : songs.length - 1;
              setSelectedIndex(newSelectedIndex);
            }}
            className="p-5 rounded-full bg-white bg-opacity-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/left-arrow.png" alt="previous" className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const newSelectedIndex = selectedIndex < songs.length - 1 ? selectedIndex + 1 : 0;
              setSelectedIndex(newSelectedIndex);
            }}
            className="p-5 rounded-full bg-white bg-opacity-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/right-arrow.png" alt="next" className="w-4 h-4" />
          </button>
        </div>

          <div className="md:hidden">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              onChange={handleCarouselChange}
              selectedItem={selectedIndex}
              showArrows={false}
            >
              {songs.map((song: Song) => (
                <div key={song.id} className="grid grid-cols-1 mt-8">
                  <div className="text-center md:text-left text-white flex flex-col justify-between">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={song.images[0].url} alt={song.name} className="w-full max-w-[75%] mx-auto" />
                    </div>
                    <div className="p-4">
                      <p className="text-xl opacity-80">{song.album}</p>
                      <h1 className="text-4xl font-bold mt-2">{song.name}</h1>
                      <h2 className="text-2xl mt-2">{song.artists.join(', ')}</h2>
                    </div>
                    <div className="flex justify-center mt-5">
                      <button
                        onClick={() => addSongs(songs)}
                        className="bg-transparent hover:bg-white text-center text-white hover:text-black text-lg px-12 py-3 border-white border-2 rounded-full"
                      >
                        Add Playlist To Library
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="hidden md:block">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              onChange={handleCarouselChange}
              selectedItem={selectedIndex}
              showArrows={false}
            >
              {songs.map((song: Song) => (
                <div key={song.id} className="grid grid-cols-2 mt-8 pb-10">
                  <div className="col-span-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={song.images[0].url} alt={song.name} className="w-full max-w-[75%]" />
                  </div>
                  <div className="col-span-1 text-left text-white flex flex-col justify-between md:h-full md:ml-0 mx-[12.5%]">
                    <p className="xl:text-4xl md:text-3xl sm:mt-0 sm:text-2xl mt-2 text-xl opacity-80">{song.album}</p>
                    <h1 className="xl:mt-8 xl:text-8xl md:mt-6 md:text-6xl sm:text-5xl sm:mt-4 mt-2 text-4xl font-bold">
                      {song.name}
                    </h1>
                    <h2 className="xl:my-8 xl:text-5xl md:my-6 md:text-4xl sm:text-3xl sm:my-4 my-2 text-2xl">
                      {song.artists.join(', ')}
                    </h2>
                    <div className="md:mt-auto md:flex-none md:justify-start mt-5 flex justify-center">
                      <button
                        onClick={() => addSongs(songs)}
                        className="bg-transparent hover:bg-white transition ease-in-out text-white hover:text-black xl:text-2xl sm:text-xl text-lg px-12 py-3 border-white border-2 rounded-full"
                      >
                        Add Playlist To Library
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Arrow Buttons */}
        <div className="md:hidden mt-4 flex justify-center pb-4">
          <button
            onClick={() => {
              const newSelectedIndex = selectedIndex > 0 ? selectedIndex - 1 : songs.length - 1;
              setSelectedIndex(newSelectedIndex);
            }}
            className="mx-3 p-5 rounded-full bg-white bg-opacity-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/left-arrow.png" alt="previous" className="w-8 h-8" />
          </button>
          <button
            onClick={() => {
              const newSelectedIndex = selectedIndex < songs.length - 1 ? selectedIndex + 1 : 0;
              setSelectedIndex(newSelectedIndex);
            }}
            className="mx-3 p-5 rounded-full bg-white bg-opacity-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/right-arrow.png" alt="next" className="w-8 h-8" />
          </button>
        </div>

        

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      )}
    </>
  );
}