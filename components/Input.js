'use client'
import { MdOutlinePhoto } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useSession} from "next-auth/react";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


export default function Input() {

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePicker = useRef(null);

  const {data: session } = useSession();

  const sendPost = async () => {
    const docRef = await addDoc(collection(db,"posts"),{
      id:session.user.id,
      text:input,
      userImg:session.user.image,
      timestamp:serverTimestamp(),
      name:session.user.name,
      username:session.user.username,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    console.log("imageRef:", imageRef);
    console.log("selectedFile:", selectedFile);
    if(setSelectedFile){
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
      })
    }

    setInput("");
  }


  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  return (

    <>
    {session && session.user && (
      <div className="flex border-b border-gray-200 p-3 space-x-3 ">
       
      <img 
         src={session.user.image} 
         alt="user" 
         className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95 "
       />
      
       <div className="w-full divide-y divide-gray-200 ">
           <div className="">
               <textarea 
               className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 " rows="2" 
               placeholder="what's happening?" 
               value={input}
               onChange={(e)=>setInput(e.target.value)}
               > 
               </textarea>
           </div>
           <div className="flex items-center justify-between pt-2.5 ">
               <div className="flex">
                   <div className="" onClick={()=>filePicker.current.click()}>
                    <MdOutlinePhoto className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100 " />
                    <input type="file" hidden ref={filePicker} onClick={addImageToPost} />
                   </div>
                   <HiOutlineEmojiHappy className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100 " />
               </div>
               <button onClick={sendPost} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 " >Tweet</button>
           </div>
          </div>
       </div>
    )}
    </>
   
  )
}
