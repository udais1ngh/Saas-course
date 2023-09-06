
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


export default function LoginPage() {
    const supabaseClient = useSupabaseClient();

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const [submitted, setSubbmited] = useState('');


    async function onSubmit(event) {
        setLoading(true);
        event.preventDefault();
        console.log(email);


        const { error } = await supabaseClient.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: window.location.origin
            }

        })

        if (error) {
            setError(error.message)
            setLoading(false)
            console.log(error)
        } else {

            setError('');
            setLoading(false);
            setSubbmited(email);
        }

    }

    return (



        <div className=" landingpage  h-screen">

            <div className="flex flex-col justify-center items-center bg-emerald-600 ">



                {

                    submitted == "" && (

                        <form onSubmit={onSubmit} className=" flex flex-col justify-center items-center p-2 h-full w-full">
                            {
                                error && (
                                    <div className="bg-red-300 rounded-md border-2 border-red-600 p-1 text-xl font-bold" role="alert">
                                        {error}
                                    </div>

                                )

                            }

                            <h1 className="text-5xl m-1 font-bold ">Welcome Back.</h1>
                            <input className="inp p-2 rounded-md" type="text" placeholder="Email" autoComplete="email" value={email} onChange={ev => setEmail(ev.target.value)} name="name" />
                            <button disabled={loading} type="submit" className="text-white rounded-md m-1  w-full    bg-black  hover:bg-zinc-900 focus:outline-none
                    font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >Login</button>
                        </form>

                    )

                }

                {

                    submitted !="" && (

                        <div className="text-2xl font-bold p-3">
                            A link has been sent to your email:- {submitted}
                        </div>


                    )

                }


            </div>

            <div className="flex flex-col justify-center items-center  border-t-2 md:border-l-2 md:border-t-0 border-black p-20 ">
                <img height="50px" src="/assets/login2.avif" alt="img" />
            </div>
        </div>




    )

}
