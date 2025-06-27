'use client'
import "../../app/globals.css";
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import customLoader from '../../../components/CustomImageLoader';
import { useEffect, useState } from "react";


export default function Signin() {

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const fetchedProviders = await getProviders();
        setProviders(fetchedProviders);
      } catch (error) {
        console.error("Error fetching authentication providers:", error);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-20 space-y-6 md:space-y-0 md:space-x-8">
      <Image
        width={44}
        height={80}
        loader={customLoader}
        unoptimized={true}
        src="https://spy.family/wp-content/uploads/2022/12/ch12findtimelinepngtwimg1920.png"
        alt=" "
        className='hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex'
      />
      <div className="">
        {providers && Object.values(providers).map((provider) => (
          <>
            <div key={provider.id} className="flex flex-col items-center">
              <Image
                width={144}
                height={144}
                loader={customLoader}
                unoptimized={true}
                className='w-36 object-cover'
                src={"https://static.vecteezy.com/system/resources/previews/023/986/731/original/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"}
                alt='Twitter logo'
              />
              <p className='text-blue-800 text-sm my-6 italic'>
                This app is created for learning purposes
              </p>
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'>
                Sign in with {provider.name}
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}


