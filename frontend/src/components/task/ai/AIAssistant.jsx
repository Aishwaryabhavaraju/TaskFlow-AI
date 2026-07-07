import useAI from "../../../hooks/useAI";

import AIActionButtons from "./AIActionButtons";
import AILoader from "./AILoader";

export default function AIAssistant({
  title,
  onInsert,
}) {

  const {

    loading,

    result,

    generateTaskDescription,

  } = useAI();

  const handleGenerate =
    async () => {

      if (!title) return;

      const description =
        await generateTaskDescription(
          title
        );

      if (description) {

        onInsert(description);

      }

    };

  return (

    <div className="space-y-4">

      <AIActionButtons
        onGenerate={handleGenerate}
      />

      {loading && <AILoader />}

      {result && (

        <div className="rounded-xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-700 dark:bg-violet-950">

          {result}

        </div>

      )}

    </div>

  );

}