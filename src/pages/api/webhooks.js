import getRawBody from "raw-body"
import { stripe } from "src/pricing/utils/stripe"
import { supabase } from "supabase"

export const config = {

    api: {

        bodyParser: false,
    },
}


export default async function handler(req, res) {

    const signature = req.headers['stripe-signature']

    const signingSecret = process.env.STRIPE_SIGNING_SECRET



    let event;

    try {

        const rawBody = await getRawBody(req, { limit: "2mb" });
        event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret)


    } catch (error) {

        console.log("Webhook Signature Verification Failed")
        return res.status(400).end();
    }


    console.log(event);




    try {

        switch (event.type) {

            case "customer.subscription.updated":
                await updateSubscription(event)
                break;

            case "customer.subscription.deleted":
                await deleteSubscription(event)
                break;

        }

        res.send({ success: true })

    } catch (error) {

        console.log(error.message);
        res.send({ success: false });

    }


}


async function updateSubscription(event) {
    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;

    const subscription_status = subscription.status;

    const price = subscription.items.data[0].price.id;

    const { data: profile } = await supabase.from('profile').select('*').eq('stripe_customer_id', stripe_customer_id).single();

    if (profile) {
        const updatedSubscription = {
            subscription_status,
            price
        }

        await supabase.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id)
    }
    else {

        const customer = await stripe.customers.retrieve(
            stripe_customer_id
        );

        const name = customer.name;
        const email = customer.email;


        const newProfile = {
            name,
            email,
            stripe_customer_id,
            subscription_status,
            price
        }

        console.log(newProfile);

        await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: newProfile,
        })


        //await supabase.from('profile').insert(newProfile);

    }

}



async function deleteSubscription(event) {

    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;

    const subscription_status = subscription.status;

    const deletedSubscription = {
        subscription_status,
        price:null,

    }

    await supabase.from('profile').update(deletedSubscription).eq("stripe_customer_id",stripe_customer_id);



}