const steps = [
  [
    "01",
    "Create your shipment",
    "Add parcel details, addresses, and delivery preferences in minutes.",
  ],
  ["02", "Request for pickup", "Request for pickup and get your parcel ready."],
  [
    "03",
    "Follow every move",
    "See status updates as your parcel travels through the network.",
  ],
  [
    "04",
    "Deliver with confidence",
    "Complete handoff and keep the delivery record in one place.",
  ],
];

export function ProcessSection() {
  return (
    <section
      className="overflow-hidden bg-[#0F172A] py-16 text-slate-50 sm:py-20"
      id="how"
    >
      <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[1.5px] text-orange-400">
            A smoother journey
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Four steps. One less thing to worry about.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-400">
            Every handoff has a place in the journey, so customers and teams
            know what comes next.
          </p>
        </div>
        <div className="steps relative grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, copy]) => (
            <div className="text-center" key={number}>
              <div className="mx-auto mb-5 grid size-14 place-items-center rounded-md bg-primary text-base font-extrabold text-white shadow-[0_0_0_7px_#0F172A]">
                {number}
              </div>
              <h3 className="text-base font-bold">{title}</h3>
              <p className="mx-auto mt-2 max-w-57.5 text-sm leading-7 text-slate-400">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
