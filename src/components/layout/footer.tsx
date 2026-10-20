import Link from "next/link";

const groups = [
  {
    title: "Explore",
    links: [
      ["Services", "#services"],
      ["How it works", "#how"],
      ["Coverage", "#coverage"],
      ["Business shipping", "#business"],
    ],
  },
  {
    title: "Quick links",
    links: [
      ["Track a parcel", "#track"],
      ["Create shipment", "#track"],
      ["Help center", "mailto:support@parcelix.example"],
      ["Contact", "mailto:support@parcelix.example"],
    ],
  },
  {
    title: "Account",
    links: [
      ["Customer login", "/login"],
      ["Courier portal", "/courier"],
      ["Admin dashboard", "/admin"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] py-12 text-slate-50 sm:pt-14">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              className="mb-4 inline-flex items-center gap-2.5 text-[26px] lg:text-[30px] font-bold tracking-[-1.2px]"
              href="/"
            >
              <span>
                Parcel<span className="text-primary">ix</span>
              </span>
            </Link>
            <p className="max-w-75 text-sm leading-7 text-slate-400">
              A modern courier and logistics management experience built around
              clear workflows, thoughtful service, and shipment visibility.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-bold">{group.title}</h4>
              <div className="grid gap-3 text-sm text-slate-400">
                {group.links.map(([label, href]) => (
                  <Link
                    key={label}
                    className="transition hover:text-orange-400"
                    href={href}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-3 pt-5 text-sm text-slate-400 sm:flex-row">
          <span>© 2026 Parcelix. Built for smoother delivery.</span>
          <span>
            Made by{" "}
            <Link
              href="https://abdullah-nayan.vercel.app"
              target="_blank"
              className="underline hover:text-primary delay-200 transition-all"
            >
              Abdullah Nayan
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
