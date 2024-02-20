
export default function News({props}) {
  return (
    <a href={props.url} target="_blank" >
      <div className="">
        <div className="">
          <h6>{props.title}</h6>
          <p>{props.source.name}</p>
        </div>
        <img className="rounded-xl" src={props.urlToImage} width={90} alt="" />
      </div>
    </a>
  )
}
