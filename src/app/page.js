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
    </main>
  );
}

