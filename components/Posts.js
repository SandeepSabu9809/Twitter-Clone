import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import Moment from "react-moment";
import { collection, deleteDoc, doc, onSnapshot, setDoc, snapshotEqual } from "firebase/firestore";
import { db, storage } from "../firebase";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import customLoader from "./CustomImageLoader";
import { useEffect , useState } from "react"; 
import { FaHeart } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";

export default function Posts({post}) {
 
  const {data : session} = useSession();
   const [likes,setLikes] = useState([]);
   const [hasLiked,setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts" , post.id , "likes"), (snapshot) => setLikes(snapshot.docs)
    )
  },[db])

  useEffect(()=>{
      setHasLiked(likes.findIndex((like)=>like.id === session?.user.id) !== -1);
  },[likes])

  async function likePost(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.id));
      }else{
        await setDoc(doc(db, "posts" , post.id ,"likes" , session?.user.id ), {
          username : session.user.username, 
        })
      }
    } else {
      signIn(); 
    }
    
  }

  async function deletePost(){
    if(window.confirm("Are you sure you want to delete this post?")){
      deleteDoc(doc(db, "posts", post.id));
      if(post.data().image){
        deleteObject(ref(storage,'posts/${post.id}/image'))
      }
    }
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
             {session?.user.id === post?.data().id && (
               <FaRegTrashCan onClick={deletePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
             )}
             
             <div className="flex items-center">
              {hasLiked ? (
                <FaHeart onClick={likePost} className="w-9 h-9 hoverEffect p-2 text-red-600 hover:bg-sky-100" /> 
              ):(
                <FaRegHeart onClick={likePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" /> 
              )}
              {likes.length > 0 && <span className={`${hasLiked && "text-red-600"} text-sm select-none`}  >{likes.length}</span>}
             </div>

             
              <FiShare2 className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <HiOutlineChartBar className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
        </div>
    </div>
  )
}
