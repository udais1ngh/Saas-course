import Link from "next/link";

export default function ProductCard({ product }) {

    return (
        <div className="box ">
            <Link href={`/products/${product.slug}`}>
                <img className="productimage" src={`/assets/${product.slug}.jpg`} alt={product.name} />
            </Link>
            <Link className="no-underline" href={`/products/${product.slug}`}>
                <div className="border-black border-t-2  w-full">
                    <h1 className="text-xl no-underline text-black font-semibold">{product.name}</h1>
                    
                </div>
            </Link>
        </div>

    )

}
