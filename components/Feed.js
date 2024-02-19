import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Posts from "./Posts";

export default function Feed() {
  const posts = [
    {
      id : "1",
      name : "NxS Immense",
      username : "CodeNeptune",
      userImg : "https://wallpapers.com/images/hd/cool-boy-anime-with-black-mask-0d8fq4rnz0h71dsz.jpg",
      img : "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      text : "nice view!",
      timestamp : "2 hours ago",   
    },
    {
      id : "2",
      name : "NxS Immense",
      username : "CodeNeptune",
      userImg : "https://wallpapers.com/images/hd/cool-boy-anime-with-black-mask-0d8fq4rnz0h71dsz.jpg",
      img : "https://images.unsplash.com/photo-1497449493050-aad1e7cad165?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      text : "wow!",
      timestamp : "2 days ago",   
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl ">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-dark border-b border-gray-200 bg-white ">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9 ">
            <HiOutlineSparkles className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post)=>(
        <Posts key={post.id} post={post} />
      ))}
    </div>
  )
}
