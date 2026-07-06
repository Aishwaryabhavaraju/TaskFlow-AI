import { useMemo, useState } from "react";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { searchData } from "./searchData";

export default function SearchModal({
  open,
  onClose,
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return searchData.filter((item) =>
      item.title
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-50
      flex
      items-start
      justify-center
      bg-black/40
      pt-20
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        w-full
        max-w-2xl
        rounded-2xl
        bg-white
        dark:bg-zinc-900
        shadow-2xl
        "
      >
        <SearchInput
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <SearchResults
          results={results}
        />

      </div>
    </div>
  );
}