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
    <div>
      {/* Twitter Logo */}
      
      <div className="">
        <Image width={50} height={50} src={"https://static.vecteezy.com/system/resources/previews/023/986/731/original/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"}></Image>
      </div>

      {/* Menu */}
      <div className="">
        <SidebarMenuItem text="Home" Icon={MdHome } />
        <SidebarMenuItem text="Explore" Icon={FaHashtag } />
        <SidebarMenuItem text="Notifications" Icon={FaRegBell } />
        <SidebarMenuItem text="Messages" Icon={TbInbox  } />
        <SidebarMenuItem text="Bookmarks" Icon={FaRegBookmark } />
        <SidebarMenuItem text="Lists" Icon={FaRegClipboard  } />
        <SidebarMenuItem text="Profile" Icon={FaRegUser  } />
        <SidebarMenuItem text="More" Icon={PiDotsThreeCircle  } />
        
      </div>

      {/* Button */}
      <button>Tweet</button>
  
      {/* Mini-profile */}
     <div className="">
      
        <img 
          src="https://wallpapers.com/images/hd/cool-boy-anime-with-black-mask-0d8fq4rnz0h71dsz.jpg" 
          alt="user" 
          className="w-10 h-10 rounded-full" 
        />
        <div className="">
          <h4>NxS Immense</h4>
          <p>@CodeNeptune</p>
        </div>
        <HiOutlineDotsHorizontal />
     </div>
    
    </div>
  )
}

export default Sidebar
