
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import AppLayout from "src/core/layouts/App";
import { supabase } from "supabase"
import { useSession, useUser } from "@supabase/auth-helpers-react";


export default function ProductPage({ prodeuct }) {

    const user = useUser();
    const session = useSession();

    const supabaseClient = useSupabaseClient();
    const [content, setContent] = useState(null);


    useEffect(() => {

        async function ProductContent() {

            const { data: productContent } = await supabaseClient.from('product_content').select("*").eq('id', prodeuct.product_content_id).single();
            setContent(productContent);

        }

        ProductContent();


    }, [])


    return (
        <AppLayout h-screen>
            <div className="particularproduct flex flex-col justify-center h-full p-1 ">
                <div className="cards-container ">
                    <div className="box2 ">
                        <div className="">
                            {
                               session  && content?.video_url ? (

                                    <div className="videobox">
                                        <ReactPlayer height="200px" width="300px" controls url={content.video_url} />

                                    </div>


                                ) : <img height="500px" width="600px" src={`/assets/${prodeuct.slug}.jpg`} />

                            }

                        </div>
                        <div className="flex flex-col gap-1 ">
                            <div className="border-b-2 border-black  flex justify-between w-full items-center">
                                <div className="p-2  text-xl font-semibold">{prodeuct.name}</div>
                                <div>
                                    {
                                      session &&  content?.download_url ? (
                                            <a href={`/assets/${content.download_url}`}><div className=" p-1  text-xl font-semibold">
                                                <button className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
                font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >Download  </button>
                                            </div>
                                            </a>
                                        ): null
                                    }
                                    {
                                      session  &&  content?.video_url ? <Link href="/products"><div className="no-underline p-1  text-xl font-semibold">
                                        <button className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
        font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >All Products </button>
                                    </div>
                                    </Link> :null

                                    }

                                   {
!session && (
    <Link href="/pricing"><div className=" p-1 no-underline text-xl font-semibold">
    <button className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >Buy Now  </button>
</div>
</Link>
)

                                   }

                                </div>
                            </div>

                            <div className="text-start p-2  text-sm ">{prodeuct.description}</div>

                        </div>
                    </div>

                </div>
            </div>


        </AppLayout>

    )

}



export async function getStaticPaths() {


    const { data: prodeuct } = await supabase
        .from('prodeuct')
        .select('slug')

    const paths = prodeuct.map((p) => ({
        params: {
            slug: p.slug,
        }
    }))


    return {

        paths,

        fallback: false,

    }


}

export async function getStaticProps(context) {

    const slug = context.params.slug;

    let { data: prodeuct } = await supabase
        .from('prodeuct')
        .select("*")
        .eq('slug', slug)
        .single()

    console.log(prodeuct);

    return {
        props: {
            prodeuct
        }
    }


}