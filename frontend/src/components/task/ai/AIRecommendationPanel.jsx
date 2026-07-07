import SuggestionCard from "./SuggestionCard";

export default function AIRecommendationPanel({

    suggestions,

}){

    if(!suggestions) return null;

    return(

        <div className="space-y-5">

            <SuggestionCard title="Recommended Priority">

                <p>{suggestions.priority}</p>

            </SuggestionCard>

            <SuggestionCard title="Estimated Hours">

                <p>{suggestions.estimatedHours}</p>

            </SuggestionCard>

            <SuggestionCard title="Suggested Due Date">

                <p>{suggestions.dueDate}</p>

            </SuggestionCard>

            <SuggestionCard title="Suggested Assignee">

                <p>{suggestions.assignee}</p>

            </SuggestionCard>
            <SuggestionCard title="Generated Subtasks">

                <ul className="list-disc pl-5">

                    {suggestions.subtasks.map((item,index)=>(

                        <li key={index}>

                            {item}

                        </li>

                    ))}

                </ul>

            </SuggestionCard>
            <SuggestionCard title="Acceptance Criteria">

                <ul className="list-disc pl-5">

                    {suggestions.acceptanceCriteria.map((item,index)=>(

                        <li key={index}>

                            {item}

                        </li>

                    ))}

                </ul>

            </SuggestionCard>

        </div>

    );

}