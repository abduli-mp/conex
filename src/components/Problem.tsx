import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Problem() {
  return (
    <div className="border-t border-b border-border">
      <div className="mx-auto flex max-w-[60%] items-center justify-between md:border-r border-b md:border-l border-border p-6 max-lg:max-w-[85%] max-md:max-w-full max-md:flex-col max-md:items-start max-md:gap-3">
        <h1 className="font-inter text-5xl font-bold tracking-tighter max-md:text-4xl">
          The Problem
        </h1>

        <p className="font-mono text-sm font-extralight text-blue-700 max-md:text-base">
          Something isn't working ?
        </p>
      </div>
      <div className="mx-auto max-w-[60%] md:border-r md:border-l border-border max-lg:max-w-[85%] max-md:max-w-full">
        <section className="mx-auto max-w-5xl px-6 py-24 max-md:px-5 max-md:py-16">
          <div className="mb-16 max-md:mb-10">
            <p className="max-w-xl font-mono text-muted max-md:text-sm max-md:leading-6">
              A simple workflow connecting YOU with one of US who can solve your
              technical problems.
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch max-md:grid-cols-1">
            <div className="border border-border">
              <div className="border-b border-border px-6 py-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  You
                </span>
              </div>

              <div className="divide-y divide-border">
                <div className="min-h-45 p-6 max-md:min-h-0 max-md:p-5">
                  <span className="font-mono text-sm text-blue-500">A</span>

                  <h3 className="mt-6 font-poppins text-xl font-semibold max-md:mt-4 max-md:text-lg">
                    Create a ticket.
                  </h3>

                  <p className="mt-2 font-mono text-xs leading-6 text-muted">
                    Describe the technical problem and send your request to your
                    technician.
                  </p>
                </div>
                <div className="min-h-45 p-6 max-md:min-h-0 max-md:p-5">
                  <span className="font-mono text-sm text-blue-500">C</span>

                  <h3 className="mt-6 font-poppins text-xl font-semibold max-md:mt-4 max-md:text-lg">
                    Schedule a visit.
                  </h3>

                  <p className="mt-2 font-mono text-xs leading-6 text-muted">
                    Choose a suitable time when the technician needs to visit.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-20 flex-col items-center justify-around max-md:h-16 max-md:w-full max-md:flex-row">
              <div className="flex w-full items-center max-md:w-16 max-md:rotate-90">
                <div className="h-px flex-1 bg-border" />

                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-bg font-mono text-xs">
                  <MdKeyboardArrowRight />
                </div>
              </div>

              <div className="flex w-full items-center max-md:w-16 max-md:rotate-90">
                <div className="h-px flex-1 bg-border" />

                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-bg font-mono text-xs">
                  <MdKeyboardArrowLeft />
                </div>
              </div>
            </div>
            <div className="border border-border">
              <div className="border-b border-border px-6 py-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  US
                </span>
              </div>

              <div className="divide-y divide-border">
                <div className="min-h-45 p-6 max-md:min-h-0 max-md:p-5">
                  <span className="font-mono text-sm text-blue-500">B</span>

                  <h3 className="mt-6 font-poppins text-xl font-semibold max-md:mt-4 max-md:text-lg">
                    Review the request.
                  </h3>

                  <p className="mt-2 font-mono text-xs leading-6 text-muted">
                    Review the problem, understand what is needed, and determine
                    the next step.
                  </p>
                </div>
                <div className="min-h-45 p-6 max-md:min-h-0 max-md:p-5">
                  <span className="font-mono text-sm text-blue-500">D</span>

                  <h3 className="mt-6 font-poppins text-xl font-semibold max-md:mt-4 max-md:text-lg">
                    Resolve the issue.
                  </h3>

                  <p className="mt-2 font-mono text-xs leading-6 text-muted">
                    Handle the technical issue and close the ticket once
                    everything is working again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
