import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import Moment from "react-moment";
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, snapshotEqual } from "firebase/firestore";
import { db, storage } from "../firebase";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import customLoader from "./CustomImageLoader";
import { useEffect , useRef, useState } from "react"; 
import { FaHeart } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { postIdState } from "../atom/ModalAtom";
import { useRecoilState } from 'recoil';
import { MdOutlinePhoto } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useRouter } from "next/navigation";


export default function Comment({comment , commentId , originalPostId}) {
 
  const {data : session} = useSession();
  const [likes,setLikes] = useState([]);
  const [hasLiked,setHasLiked] = useState(false);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postx,setPostx] = useState({});
  const [input, setInput] = useState("");
  const filePicker = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (postId) {
      const unsubscribe = onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPostx(snapshot.data()); // Assuming you only want to set the data, adjust if necessary
      });
      // Cleanup function to unsubscribe from snapshot listener when component unmounts or when postId changes
      return () => unsubscribe();
    } else {
      // Reset postx when postId becomes falsy
      setPostx(null);
    }
  }, [postId]); // Run effect whenever postId changes or component mounts


  useEffect(() => {
    if(commentId){
      const unsubscribe = onSnapshot(
        collection(db, "posts" ,originalPostId,"comments", commentId , "likes"), (snapshot) => setLikes(snapshot.docs)
      )
      return () => unsubscribe()
    }
  },[db,originalPostId,commentId])


  async function sendComment(){
    await addDoc(collection(db,"posts",postId,"comments"),{
      comment: input,
      name:session.user.name,
      username:session.user.username,
      userImg:session.user.image,
      timestamp:serverTimestamp(),
    })
    setInput("");
    router.push(`/posts/${postId}`);
  }

  useEffect(()=>{
      setHasLiked(likes.findIndex((like)=>like.id === session?.user.id) !== -1);
  },[likes])

  async function likeComment(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", originalPostId, "comments",commentId,"likes", session?.user.id));
      }else{
        await setDoc(doc(db, "posts" , originalPostId ,"comments" ,commentId,"likes", session?.user.id ), {
          username : session.user.username, 
        })
      }
    } else {
      signIn(); 
    }
    
  }



  async function deleteComment(){
    if(window.confirm("Are you sure you want to delete this comment?")){
      await deleteDoc(doc(db, "posts",originalPostId,"comments",commentId));
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 " >
        {/* image */}
        {comment?.userImg ? (
          <Image 
            width={11}
            height={11}
            src={comment?.userImg}
            loader={customLoader} 
            unoptimized={true}
            alt="user" 
            className="w-11 h-11 rounded-full mr-4" 
          />
        ):null}
        {/* rightside */}
        <div className="flex-1">
            {/* header */} 
            <div className="flex items-center justify-between ">
                {/* post-user info */}
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">{comment?.name}</h4>
                    <span className="text-sm sm:text-[15px] ">@{comment?.username} -</span>
                    <span className="text-sm sm:text-[15px} hover:underline">
                      <Moment fromNow>
                        {comment?.timestamp?.toDate()}
                      </Moment>
                    </span>
                </div>
                {/* icon */}
                <HiOutlineDotsHorizontal className="h-10 flex justify-end hoverEffect w-10 bg-sky-100 hover:text-sky-500 p-2"/>
            </div>
           {/* post-text */}
           <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 break-all pr-2 " style={{ overflowWrap: 'break-word' , whiteSpace: 'pre-line' }} >{comment?.text}</p>
           {/* post-image */}
           {comment?.image ? (
            <Image loader={customLoader} unoptimized={false} width={700} height={700} layout="responsive" src={comment?.image} alt="gh" className=" w-auto h-auto rounded-2xl mr-2 " />
           ):null}
           <div className="flex justify-between text-gray-500 p-2">
              {/* icons */}

              <div className="flex items-center select-none ">   
                <IoChatbubbleEllipsesOutline 
                    onClick={() => {
                    setPostId(id);
                    document.getElementById('my_modal_3').showModal();
                }} className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                {comment.length > 0 && <span className="text-sm select-none" >{comment.length}</span>}
              </div>
             
             {session?.user.id === comment?.id && (
               <FaRegTrashCan onClick={deletePost} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
             )}
             
             <div className="flex items-center">
              {hasLiked ? (
                <FaHeart onClick={likeComment} className="w-9 h-9 hoverEffect p-2 text-red-600 hover:bg-sky-100" /> 
              ):(
                <FaRegHeart onClick={likeComment} className="w-9 h-9 hoverEffect p-2 hover:text-red-600 hover:bg-sky-100" /> 
              )}
              {likes.length > 0 && <span className={`${hasLiked && "text-red-600"} text-sm select-none`}  >{likes.length}</span>}
             </div>

             
              <FiShare2 className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <HiOutlineChartBar className="w-9 h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
        </div>
        <>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                <button className="btn btn-sm btn-ghost absolute focus:outline-none right-2 top-2">✕</button>
              </form>
              <div className="p-2 flex items-center space-x-1 relative">
               <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-400"/>
                {postx?.userImg ? (
                  <Image 
                    width={11}
                    height={11}
                    src={postx?.userImg}
                    loader={customLoader} 
                    unoptimized={true}
                    alt="user" 
                    className="w-11 h-11 rounded-full mr-4  " 
                  />
                ):null}
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">{postx?.name}</h4>
                    <span className="text-sm sm:text-[15px] ">@{postx?.username} -</span>
                    <span className="text-sm sm:text-[15px} hover:underline">
                      <Moment fromNow>
                        {postx?.timestamp?.toDate()}
                      </Moment>
                    </span>
              </div>
              <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2 ">{postx?.text}</p>
          <div className="flex border-b border-gray-200 p-3 space-x-3 ">
          <Image 
            width={11}
            height={11}
            src={session?.user.image} 
            unoptimized={true}
            loader={customLoader}
            alt="user" 
            className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95 "
          />
          
          <div className="w-full divide-y divide-gray-200 ">
              <div className="">
                  <textarea 
                  className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 " rows="2" 
                  placeholder="Tweet your reply" 
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  > 
                  </textarea>
              </div>
              <div className="flex items-center justify-between pt-2.5 ">
                    <div className="flex">
                      <div className="" onClick={()=>filePicker.current.click()}>
                        <MdOutlinePhoto className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100 " />
                        {/* <input type="file" hidden ref={filePicker} onChange={addImageToPost} /> */}
                      </div>
                      <HiOutlineEmojiHappy className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100 " />
                    </div>
                      <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 " >Reply</button> 
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </>
        
    </div>
  )
}
