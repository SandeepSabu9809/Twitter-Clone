import Image from "next/image";
import customLoader from "./CustomImageLoader";

export default function News({props}) {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer" >
      <div className="flex items-center justify-between  px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{props.title}</h6>
          <p className="text-xs font-medium text-gray-500">{props.source.name}</p>
        </div>
        {props.urlToImage && (
          <>
          <Image loader={customLoader} unoptimized={true} className="rounded-xl" src={props.urlToImage} width={72} height={72} alt="" />
          </>
        )}
      </div>
    </a>
  )
}
