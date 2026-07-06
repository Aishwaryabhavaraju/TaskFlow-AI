import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import useBreadcrumbs from "../../hooks/useBreadcrumbs";

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="flex items-center text-sm text-zinc-500">

      <Link
        to="/dashboard"
        className="hover:text-yellow-500"
      >
        Dashboard
      </Link>

      {breadcrumbs.map((item) => (
        <div
          key={item.path}
          className="flex items-center"
        >
          <ChevronRight
            size={16}
            className="mx-2"
          />

          <Link
            to={item.path}
            className="hover:text-yellow-500"
          >
            {item.title}
          </Link>

        </div>
      ))}

    </div>
  );
}