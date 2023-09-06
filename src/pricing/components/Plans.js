import { useState } from "react"
import classNames from "classnames";
import { SITE_URL } from "src/core/utils";
import { loadStripe } from "@stripe/stripe-js";


export default function Plans({ plan }) {

    const p = plan[1];
    const y = plan[0];


    const [isSelected, setIsSelected] = useState(false);

    const [isRedirecting,setIsRedirecting] = useState(false);


    async function onCheckout() {

        setIsRedirecting(true);
        const response = await fetch(`${SITE_URL}/api/checkout/${isSelected ? y.id : p.id}`)
        const data = await response.json();

        const stripeRedirect = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

        await stripeRedirect.redirectToCheckout({ sessionId: data.id });

    }



    return (
        <div className="m-auto ">

            <div className="box3 bg-white flex flex-col justify-center items-center rounded-md p-2 gap-2">

                <div className="flex items-center gap-1">
                    <h1 className="text-xl font-bold">Monthly</h1>

                    <div onClick={() => setIsSelected(!isSelected)} className={classNames('flex w-20 h-10 bg-gray-600  rounded-full', {
                        'bg-green-500': isSelected
                    })}>
                        <span className={classNames('h-10 w-10 bg-white rounded-full transition-all duration-500 shadow-lg', {
                            'ml-10': isSelected
                        })} />
                    </div>

                    <h1 className="text-xl font-bold">Yearly</h1>

                </div>


                {

                    !isSelected && (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="text-2xl font-bold">{p.name}<br /></h1>
                            <h1 className="text-xl font-bold">Just ₹{p.price} / {p.interval}</h1>
                            <button disabled={isRedirecting} onClick={onCheckout} className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
                font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >{isRedirecting ? "Loading..." : "Buy Now"}</button>
                        </div>

                    )

                }

                {

                    isSelected && (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="text-2xl font-bold">{y.name}<br /></h1>
                            <h1 className="text-xl font-bold">Just ₹{y.price} / {y.interval}</h1>
                            <button disabled={isRedirecting} onClick={onCheckout} className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
                font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >{isRedirecting ? "Loading..." : "Buy Now"}</button>
                        </div>
                    )


                }

            </div>





        </div>



    )

}
