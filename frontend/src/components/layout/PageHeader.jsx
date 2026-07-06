import Breadcrumb from "./Breadcrumb";
import HeaderActions from "./HeaderActions";

export default function PageHeader({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-8">

      <Breadcrumb />

      <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">

            {title}

          </h1>

          <p className="mt-2 text-zinc-500">

            {description}

          </p>

        </div>

        <HeaderActions>

          {children}

        </HeaderActions>

      </div>

    </div>
  );
}