import "./globals.css";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Widgets from "../../components/Widgets";


export default function Home() {
  return (
    <main className="flex min-h-screen mx-auto">
      {/* sidebar */}
      <Sidebar/>
      
      {/* Feed */}
      <Feed />
    
      {/* Widgets */}
      <Widgets /> 


      {/* Modal */}
      

    </main>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`)
//   const data = await res.json()
 
//   // Pass data to the page via props
//   return { props: { data } }
// }