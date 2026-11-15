import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import SectionHead from "./SectionHead";
import { useLang } from "../i18n/useLang";

type Step = { key: string; title: string; text: string };

function Column({ label, steps }: { label: string; steps: Step[] }) {
  return (
    <div className="border border-border bg-background">
      <div className="border-b border-border bg-surface px-6 py-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {label}
        </span>
      </div>

      <div className="divide-y divide-border">
        {steps.map((step) => (
          <div key={step.key} className="min-h-44 p-6 max-md:min-h-0 max-md:p-5">
            <span className="font-mono text-sm font-bold text-primary">
              {step.key}
            </span>
            <h3 className="mt-5 text-xl font-bold max-md:mt-3 max-md:text-lg">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector({ reverse = false }: { reverse?: boolean }) {
  const Icon = reverse ? MdKeyboardArrowLeft : MdKeyboardArrowRight;
  return (
    <div className="flex w-full items-center max-md:w-16 max-md:rotate-90">
      <div className="h-px flex-1 bg-border" />
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background text-primary">
        <Icon aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Process() {
  const { t } = useLang();
  const { process } = t;

  return (
    <section aria-labelledby="process-title">
      <SectionHead
        id="process-title"
        title={process.title}
        aside={process.aside}
      />

      <div className="shell border-border lg:border-x">
        <div className="px-6 py-16 md:px-10 md:py-20">
          <p className="mb-12 max-w-xl text-muted max-md:mb-8">
            {process.intro}
          </p>

          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch max-md:grid-cols-1">
            <Column
              label={process.you}
              steps={[process.steps[0], process.steps[2]]}
            />

            <div className="flex w-20 flex-col items-center justify-around max-md:h-16 max-md:w-full max-md:flex-row">
              <Connector />
              <Connector reverse />
            </div>

            <Column
              label={process.us}
              steps={[process.steps[1], process.steps[3]]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
