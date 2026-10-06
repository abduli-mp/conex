import { Link } from "react-router-dom";

import { MdKeyboardArrowLeft } from "react-icons/md";

export default function GoBack() {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex w-full md:max-w-[60%] items-center px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="
        group
        inline-flex
        items-center
        gap-2
        font-mono
        text-xs
        text-muted
        transition-colors
        hover:text-text
      "
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            <MdKeyboardArrowLeft />
          </span>

          <span className="underline underline-offset-4">_go_back_</span>
        </Link>
      </div>
    </div>
  );
}
