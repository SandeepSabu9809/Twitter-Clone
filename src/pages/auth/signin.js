import 'tailwindcss/tailwind.css';
import { getProviders ,signIn } from 'next-auth/react';
import Image from 'next/image';
import customLoader from '../../../components/CustomImageLoader';

export default function signin({providers}) {
  return (
    <div className='flex justify-center mt-20 space-x-4' >
      <Image
      width={44}
      height={80}
      loader={customLoader}
      unoptimized="true"
      src="https://spy.family/wp-content/uploads/2022/12/ch12findtimelinepngtwimg1920.png" 
      alt="twitter image inside a phone" 
      className='hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex' 
      />
      <div className="">
        {Object.values(providers).map((provider)=>(
            <div key={provider.name} className="flex flex-col items-center">
                <Image width={36} height={36} loader={customLoader} unoptimized="true"  className='w-36 object-cover' src={"https://static.vecteezy.com/system/resources/previews/023/986/731/original/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"} alt='twitter-logo'></Image>
                <p className='text-blue-800 text-center text-sm my-10 italic '>This app is created for learning purposes</p>
                <button onClick={()=>signIn(provider.id, {callbackUrl:"/"})} className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 ' >Sign in with {provider.name}</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  
  const providers = await getProviders();

  return {
    props: {
      providers,
    }
  };
}
