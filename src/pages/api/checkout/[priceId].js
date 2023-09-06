//import { SITE_URL } from "src/core/utils";
import { stripe } from "src/pricing/utils/stripe";

export default async function handler(req, res) {

    const { priceId } = req.query;


    const stripeSession = await stripe.checkout.sessions.create(
        {
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.SITE_URL}/success`,
            cancel_url: `${process.env.SITE_URL}/pricing`,


        }
    )

res.send({id:stripeSession.id});

}
