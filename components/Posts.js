import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";

export default function Posts({post}) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 " >
        {/* image */}
        <img 
          src={post.userImg} 
          alt="user" 
          className="w-11 h-11 rounded-full mr-4  " 
        />
        {/* rightside */}
        <div className="">
            {/* header */}
            <div className="flex items-center justify-between ">
                {/* post-user info */}
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">{post.name}</h4>
                    <span className="text-sm sm:text-[15px] ">@{post.username} -</span>
                    <span className="text-sm sm:text-[15px} hover:underline">{post.timestamp}</span>
                </div>
                {/* icon */}
                <HiOutlineDotsHorizontal className="h-10 hoverEffect w-10 bg-sky-100 hover:text-sky-500 p-2"/>
            </div>
           {/* post-text */}
           <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 " >{post.text}</p>
           {/* post-image */}
           <img src={post.img} alt="" className="rounded-2xl mr-2 " />
           <div className="flex justify-between text-gray-500 p-2">
              {/* icons */}
              <IoChatbubbleEllipsesOutline className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <FaRegTrashCan className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
              <FaRegHeart className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" /> 
              <FiShare2 className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <HiOutlineChartBar className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
        </div>
    </div>
  )
}