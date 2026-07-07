import useAI from "../../../hooks/useAI";

import AIRecommendationPanel from "./AIRecommendationPanel";

export default function AISuggestions({

    task,

}){

    const{

        loading,
        suggestions,
        generateSmartSuggestions,

    }=useAI();

    return(

        <div className="space-y-4">

            <button

                onClick={()=>
                    generateSmartSuggestions(task)
                }

                className="rounded-xl bg-violet-600 px-4 py-2 text-white"
            >

                🤖 Smart Suggestions

            </button>

            {loading && (

                <p>

                    Generating AI Suggestions...

                </p>

            )}

            <AIRecommendationPanel
                suggestions={suggestions}
            />

        </div>

    );

}