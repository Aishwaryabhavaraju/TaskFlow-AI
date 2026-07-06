import SearchItem from "./SearchItem";

export default function SearchResults({
  results,
}) {
  if (!results.length) {
    return (
      <div className="p-8 text-center text-zinc-500">
        No results found.
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto p-3">

      {results.map((item) => (
        <SearchItem
          key={item.id}
          item={item}
        />
      ))}

    </div>
  );
}