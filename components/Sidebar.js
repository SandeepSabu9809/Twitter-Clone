import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import { MdHome } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { TbInbox } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { PiDotsThreeCircle } from "react-icons/pi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1 ">
        <Image width={50} height={50} src={"https://static.vecteezy.com/system/resources/previews/023/986/731/original/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"}></Image>
      </div>

      {/* Menu */}
      <div className="mt-5 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={MdHome } active />
        <SidebarMenuItem text="Explore" Icon={FaHashtag } />
        <SidebarMenuItem text="Notifications" Icon={FaRegBell } />
        <SidebarMenuItem text="Messages" Icon={TbInbox  } />
        <SidebarMenuItem text="Bookmarks" Icon={FaRegBookmark } />
        <SidebarMenuItem text="Lists" Icon={FaRegClipboard  } />
        <SidebarMenuItem text="Profile" Icon={FaRegUser  } />
        <SidebarMenuItem text="More" Icon={PiDotsThreeCircle  } />
        
      </div>

      {/* Button */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline " >Tweet</button>
  
      {/* Mini-profile */}
     <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto ">
        <img 
          src="https://wallpapers.com/images/hd/cool-boy-anime-with-black-mask-0d8fq4rnz0h71dsz.jpg" 
          alt="user" 
          className="w-10 h-10 rounded-full xl:mr-2 " 
        />
        <div className="leading-5 hidden  xl:inline">
          <h4 className="font-bold">NxS Immense</h4>
          <p className="text-gray-500">@CodeNeptune</p>
        </div>
        <HiOutlineDotsHorizontal className=" ml-8 hidden  xl:inline" />
     </div>
    
    </div>
  )
}

export default Sidebar
