// import Link from "next/link";
// import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// import classNames from "classnames";
// import { SITE_URL } from "../utils";


// export default function Navlinks({showNav}) {
   
//     const user = useUser();
//     const session = useSession();


//     const supabaseClient = useSupabaseClient();

//     function Logout(){
//         supabaseClient.auth.signOut();
        
//         }


// async function ManageBilling(){

// const response =await fetch(`${SITE_URL}/api/manage-billing`)
// const data = await response.json();

// if(data){
//     window.location.href=data.url;

// }


// }


//     return (
//         <div className= {(showNav?"":"hidden")+"md:block fixed top-12 left-0 w-screen  bg-white py-2 md:static md:py-0 md:w-full"}>
//             {
//                 !session && (
//                     <div className=" flex  gap-4   justify-center items-center  md:flex  md:gap-4  md:items-center md:justify-end">

//                         <Link href="/login">
//                             <div className="text-xl font-semibold bg-amber-400 hover:bg-amber-300  p-1 ">
//                                 Login
//                             </div>
//                         </Link>

//                         <Link href="/pricing">
//                             <div className="text-xl font-semibold hover:-translate-y-0.5  hover:scale-105 ">
//                                 Pricing
//                             </div>

//                         </Link>

//                     </div>
//                 )
//             }

//             {
//                 session && (
//                     <div className="  flex  gap-4  justify-center items-center  md:flex  md:gap-4  md:items-center md:justify-end">


//                         <div onClick={Logout} className="text-xl font-semibold bg-amber-400 hover:bg-amber-300  p-1 ">
//                             Logout
//                         </div>

//                         <Link href="/products">
//                             <div className="text-xl font-semibold hover:-translate-y-0.5  hover:scale-105 ">
//                                 Products
//                             </div>
//                         </Link>


//                         <div onClick={ManageBilling} className="text-xl font-semibold hover:-translate-y-0.5  hover:scale-105 cursor-pointer">
//                             Billing
//                         </div>
//                     </div>
//                 )
//             }

//         </div>
//     )

// }