type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered }: SectionHeadingProps) {
  return (
    <header className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-zinc-500">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl leading-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base text-zinc-400 md:text-lg">{description}</p> : null}
    </header>
  );
}
