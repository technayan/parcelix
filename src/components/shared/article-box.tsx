import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

export default function ArticleBox({
  title,
  Icon,
  description,
  href,
  link,
}: {
  title: string;
  Icon: LucideIcon;
  description: string;
  href?: string;
  link?: string;
}) {
  return (
    <article
      className="group rounded-xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-orange-500/50"
      key={title}
    >
      <div className="mb-5 grid size-12 place-items-center rounded-md bg-orange-500/10 text-primary group-hover:bg-primary group-hover:text-white transition">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="mb-5 mt-2 text-[15px] leading-7 text-muted-foreground">
        {description}
      </p>
      {href && link && (
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 duration-300"
          href={href}
        >
          {link}
          <ArrowUpRight size={15} />
        </Link>
      )}
    </article>
  );
}
