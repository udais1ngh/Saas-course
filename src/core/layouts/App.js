
import Navbars from "../components/Navbar";


export default function AppLayout({ children }) {


    return (
        <div className="flex flex-col h-screen">


            <Navbars/>

           
            
            {children}
        </div>

    )

}
