export default function SuggestionCard({

    title,
    children,

}){

    return(

        <div className="rounded-xl border p-4">

            <h4 className="mb-3 font-semibold">

                {title}

            </h4>

            {children}

        </div>

    );

}