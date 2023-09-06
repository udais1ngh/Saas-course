import AppLayout from "src/core/layouts/App";
import Benefits from "src/pricing/components/Benefits";
import Plans from "src/pricing/components/Plans";
import { stripe } from "src/pricing/utils/stripe";

export default function PricingPage({ plans }) {
    return (

        <AppLayout>


            <div className="landingpage h-full w-full   ">

                <div className="l-ls bg-amber-400 flex  flex-col   gap-2">
                  <Plans plan={plans}/>
                </div>


                <Benefits />

            </div>


        </AppLayout>

    )

}



export async function getStaticProps() {

    const { data: prices } = await stripe.prices.list()

    const plans = [];

    for (const price of prices) {
        const product = await stripe.products.retrieve(price.product);

        plans.push({
            name: product.name,
            id: price.id,
            price: price.unit_amount / 100,
            interval: price.recurring.interval
        })
    }
    return {

        props: {
            plans,
        }

    }
}