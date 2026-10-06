import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="mx-auto md:max-w-[60%] w-full md:border-l md:border-r md:border-border px-7 py-8 sm:px-8 sm:py-10 md:px-10 lg:py-12">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        <h1 className="font-mono text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Get <span className="text-blue-700">help</span> from <span className="text-blue-700">engineers</span>.
        </h1>

        <p className="max-w-2xl font-sans text-sm leading-relaxed text-muted sm:text-base md:text-lg">
          Simple solutions are often just around the corner. We find them and
          turn them into technology that works.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-5">
          <Link
            to="/create-ticket"
            className="
              h-9
              flex
              items-center
              bg-[#f5f5f5]
              px-4
              font-mono
              text-sm
              font-medium
              text-[#111]
              transition-transform
              duration-150
              hover:-translate-y-0.5
              active:translate-y-0
              md:inline-flex
            "
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
            }}
          >
            Create a ticket
          </Link>

          <Link
            to="/create-account"
            className="
              h-9
              flex
              items-center
              bg-blue-700
              px-4
              font-mono
              text-sm
              font-medium
              text-[#f5f5f5]
              transition-transform
              duration-150
              hover:-translate-y-0.5
              active:translate-y-0
              md:inline-flex
            "
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
            }}
          >
            Track ticket
          </Link>
        </div>
      </div>

      <div></div>
    </div>
  );
}
