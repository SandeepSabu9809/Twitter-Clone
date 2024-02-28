import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import Moment from "react-moment";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import customLoader from "./CustomImageLoader";
// import { useEffect , useState } from "react";

export default function Posts({post}) {
 
  const {data : session} = useSession();
  // const [likes,setLikes] = useState([]);

  // useEffect(() => {

  // },[db])

  async function likePost(){
    await setDoc(doc(db, "posts" , post.id ,"likes" , session.user.id ), {
      username : session.user.username, 
    })
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 " >
        {/* image */}
        <Image 
          width={11}
          height={11}
          src={post.data().userImg}
          loader={customLoader} 
          unoptimized={true}
          alt="user" 
          className="w-11 h-11 rounded-full mr-4  " 
        />
        {/* rightside */}
        <div className="flex-1">
            {/* header */}
            <div className="flex items-center justify-between ">
                {/* post-user info */}
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">{post.data().name}</h4>
                    <span className="text-sm sm:text-[15px] ">@{post.data().username} -</span>
                    <span className="text-sm sm:text-[15px} hover:underline">
                      <Moment fromNow>
                        {post.data()?.timestamp?.toDate()}
                      </Moment>
                    </span>
                </div>
                {/* icon */}
                <HiOutlineDotsHorizontal className="h-10 flex justify-end hoverEffect w-10 bg-sky-100 hover:text-sky-500 p-2"/>
            </div>
           {/* post-text */}
           <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 break-all pr-2 " style={{ overflowWrap: 'break-word' , whiteSpace: 'pre-line' }} >{post.data().text}</p>
           {/* post-image */}
           <Image loader={customLoader} unoptimized={true} width={1920} height={1080} src={post.data().image} alt="gh" className="rounded-2xl mr-2 " />
           <div className="flex justify-between text-gray-500 p-2">
              {/* icons */}
              <IoChatbubbleEllipsesOutline className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <FaRegTrashCan className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
              <FaRegHeart onClick={likePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" /> 
              <FiShare2 className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <HiOutlineChartBar className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
        </div>
    </div>
  )
}
