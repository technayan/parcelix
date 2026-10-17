const quotes = [
  {
    id: 1,
    initials: "AN",
    name: "Abdullah Nayan",
    role: "Small business owner",
    quote:
      "The shipment journey is easy to follow. I can quickly understand where an order stands without chasing updates.",
  },
  {
    id: 2,
    initials: "MA",
    name: "Md. Abdullah Al Mamun Nayan",
    role: "Online shopper",
    quote:
      "A cleaner process makes a big difference. Pickup, transit, and delivery feel like one connected experience.",
  },
  {
    id: 3,
    initials: "AN",
    name: "Abdullah Nayan",
    role: "Small business owner",
    quote:
      "The workflow-first approach makes it easier for our team to understand the next step and resolve exceptions.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-card/60 py-16 sm:py-20" id="reviews">
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-primary">
            Designed around people
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Good delivery feels effortless.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Don't Take Our Word for It. Take Theirs.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((item) => (
            <article
              className="rounded-2xl border border-border bg-background p-6"
              key={item.id}
            >
              <div className="text-sm tracking-[2px] text-primary">★★★★★</div>
              <blockquote className="my-4 text-[15px] leading-7 text-muted-foreground">
                “{item.quote}”
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#0F172A] text-xs font-extrabold text-white">
                  {item.initials}
                </div>
                <div>
                  <strong className="block text-sm">{item.name}</strong>
                  <span className="text-xs text-muted-foreground">
                    {item.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
