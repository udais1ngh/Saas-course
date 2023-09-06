import Image from "next/image";

import AppLayout from "src/core/layouts/App";
import Link from "next/link";


export default function HomePage() {
    return (

        <AppLayout >


            <div className="landingpage  h-full " >
                <div className=" l-ls  px-3 flex  flex-col  gap-2 bg-emerald-300">
                    <h1 className="text-5xl text-bold">Study today,<br />Earn Tomorrow.
                    </h1>
                    <p>The best affordable online courses you can find on Internet today. </p>
                    <Link href="/products"><button className="text-white  bg-gray-950   hover:bg-zinc-900  focus:outline-none  
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-zinc-900
                dark:focus:bg-zinc-900 w-full" >Explore</button></Link>
                </div>

                <div className="ls-rs bg-indigo-400 border-t-2 md:border-l-2 md:border-t-0 border-black p-4 ">
                    <img  height="350px"  width="400px" src="/assets/oc2.png" alt="image" />

                </div>
            </div>


        </AppLayout>

        

    )
}
