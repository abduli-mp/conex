import { MdOutlineArrowOutward } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t border-border sticky bottom-0 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <p className="font-mono text-xs text-muted">© 2026 Conex</p>

        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span>Coded by</span>

          <a
            href="https://abduliputz.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text transition-colors hover:text-blue-500"
          >
            Abduli Pütz
          </a>

          <span>+</span>

          <a
            href="https://gustavorochaduck.github.io/gustavorochaduck/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text transition-colors hover:text-blue-500"
          >
            Gustavo
          </a>

          <span>
            <MdOutlineArrowOutward />
          </span>
        </div>
      </div>
    </footer>
  );
}
