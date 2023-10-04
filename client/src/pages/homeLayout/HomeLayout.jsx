import { Outlet } from "react-router-dom";
import { Header} from "../../UI/header"
import { Footer } from "../../UI/footer";

function Home() {
  return (
 <main>
    <Header/>
    <Outlet/>
    <Footer/>
 </main>
  )
}

export default Home;
