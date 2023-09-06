import Link from "next/link";

export default function SuccessPage() {

    return (
        <div className="h-screen">
            <div className=" flex flex-col justify-center items-center h-full">
                <h1 className="text-3xl font-bold">You&apos;re in! <br /></h1>
                <Link href="/login">
                    <button className="text-black m-1    bg-white   hover:bg-slate-300 focus:outline-none
                font-medium  border-2 border-black p-2 text-sm px-5 py-2.5 text-center  " >Go to login</button>
                </Link>
            </div>
        </div>
    )

}
