const options = [
  "None",
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
];

export default function RecurrenceSelector({
  value,
  onChange,
}) {

  return (

    <select
      value={value}
      onChange={e =>
        onChange(e.target.value)
      }
      className="w-full rounded-lg border p-2"
    >

      {options.map(option => (

        <option
          key={option}
          value={option}
        >

          {option}

        </option>

      ))}

    </select>

  );

}