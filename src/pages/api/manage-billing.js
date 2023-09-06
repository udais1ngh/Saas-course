import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
//import { SITE_URL } from "src/core/utils";
import { stripe } from "src/pricing/utils/stripe";


export default async function handler(req, res) {

    const supabaseServerClient = createServerSupabaseClient({
        req,
        res
    })


    const {
        data:{user},
    }= await supabaseServerClient.auth.getUser();

    if(!user){

        return res.status(401).send('unauthorized')
    }

 const {data:profile}=await supabaseServerClient.from("profile").select("stripe_customer_id").eq("stripe_customer_id",user.user_metadata.stripe_customer_id).single();
 
const billingSession = await stripe.billingPortal.sessions.create({
    customer:profile.stripe_customer_id,
    return_url:process.env.SITE_URL,
})


res.send({url : billingSession.url})

}
