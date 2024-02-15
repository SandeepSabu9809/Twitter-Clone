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


const Sidebar = () => {
  return (
    <div>
      {/* Twitter Logo */}
      
      <div className="div">
        <Image width={50} height={50} src={"https://static.vecteezy.com/system/resources/previews/023/986/731/original/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"}></Image>
      </div>

      {/* Menu */}
      <div className="div">
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
     <div className="div">
      <div className="img-anime">
        <img width={70} height={50} src="https://wallpapers.com/images/hd/cool-boy-anime-with-black-mask-0d8fq4rnz0h71dsz.jpg" alt="user" />
      </div>
      <div className="div">
        <h4>NxS Immense</h4>
        <p>@CodeNeptune</p>
      </div>
     </div>
  
    </div>
  )
}

export default Sidebar
