import "../../app/globals.css";
import Sidebar from "../../../components/Sidebar";
import Widgets from "../../../components/Widgets";
import { SessionProvider } from "next-auth/react";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/router";
import Posts from "../../../components/Posts";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { RecoilRoot } from "recoil";

export default function Home() {

  const router = useRouter();
  const {id} = router.query;
  const [post,setPost] = useState(null);

  useEffect(() => {
    if(id){
      const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot);
      })
      return () => unsubscribe();
    }
  }, [db, id]);

   
    return (
    <main className="flex min-h-screen mx-auto">
      {/* sidebar */}
      <SessionProvider>
        <Sidebar/>
      </SessionProvider>
      {/* Feed */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl ">
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-dark border-b border-gray-200 bg-white ">
        <div className="hoverEffect" onClick={() => router.push("/")}>
          <FaArrowLeft className="w-5 h-5 " />
        </div>
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
      </div>
      
      <SessionProvider>
        <RecoilRoot>
         <Posts id={id} post={post} />
        </RecoilRoot>
      </SessionProvider>

      </div>
      {/* Widgets */}
      <Widgets /> 
    </main>
  );
}
