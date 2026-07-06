export default function AuthHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-8">

      <h1
        className="
        text-4xl
        font-bold
        tracking-tight
        "
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="
          mt-3
          text-zinc-600
          dark:text-zinc-400
          "
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}