import AppLayout from "src/core/layouts/App";
import ProductCard from "src/products/components/Card";
import { supabase } from "supabase";

export default function ProductsPage({ prodeuct }) {
    return (
        <AppLayout>

            <div className="cardcontainer h-full">

                <div className=" cards-container ">
                    <div>
                        <h1 className="text-5xl font-medium m-auto flex justify-center md:justify-start md:ml-5 ">All Products</h1>
                    </div>
                    <div className=" cards ">
                        {
                            prodeuct.map(p => (

                                <ProductCard key={p.id} product={p} />

                            ))
                        }
                    </div>
                </div>


            </div>

        </AppLayout>
    )
}



export async function getStaticProps() {

    let { data: prodeuct } = await supabase
        .from('prodeuct')
        .select('*')

    return {

        props: {

            prodeuct

        },
    }

}