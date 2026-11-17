export default function SectionHead({
  title,
  aside,
  id,
  as: Heading = "h2",
}: {
  title: string;
  aside?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="border-y border-border bg-surface">
      <div className="shell flex items-center justify-between gap-3 border-x border-border px-6 py-6 max-md:flex-col max-md:items-start md:px-10">
        <Heading id={id} className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </Heading>
        {aside && (
          <p className="font-mono text-sm text-primary">{aside}</p>
        )}
      </div>
    </div>
  );
}
