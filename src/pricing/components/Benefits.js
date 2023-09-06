export default function Benefits() {

    const benefits = [
        {
            title: "One low price",
            sub: "Save big and get everyday with super low monthly subscriptions.",
        },
        {
            title: "No Limits",
            sub: "Get complete access to everything on the site. ",
        },
        {

            title: "Cancel anytime",
            sub: "Pause or stop your Subscription, whenever you like."
        }


    ]

    return (
        <div className=" ls-rs flex  flex-col  gap-2 border-t-2 md:border-l-2 md:border-t-0 border-black p-4">
            <div className=" absolute ">
                {
                    benefits.map(b => (
                        <div key={b.title} className="m-3">
                            <h1 className="text-2xl font-bold ">{b.title}<br /></h1>
                            <div className="text-sm font-semibold">
                                {b.sub}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
