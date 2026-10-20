import AuthImage from "@/../public/assets/parcelix-auth.jpg";
import CreateShipmentForm from "@/components/form/shipment-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
                <span className="size-1.5 rounded-full bg-[#F97316]" /> Get
                started
              </div>
              <h2 className="text-[32px] font-semibold leading-tight tracking-[-1.6px] text-[#0F172A] dark:text-white">
                Create your shipment<span className="text-[#F97316]">.</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Provide the following information carefully to start.
              </p>
            </div>

            <CreateShipmentForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={AuthImage}
          width={1000}
          height={1000}
          alt="Picture of a courier"
          className="absolute inset-0 h-full w-full object-cover "
        />

        <div className="absolute bottom-0 left-0 w-full  px-12 pb-12 pt-50 flex flex-col gap-8 bg-linear-to-t from-foreground to-foreground/0 dark:from-background dark:to-background/0">
          <h3 className="text-4xl xl:text-5xl font-bold text-background dark:text-foreground">
            Delivered faster <br /> than you'd expect.
          </h3>
          <div className="grid grid-cols-3 w-full">
            <div className="">
              <h5 className="text-3xl font-bold text-primary">24/7</h5>
              <span className="text-sm font-light text-white">
                Shipment visibility
              </span>
            </div>
            <div className="">
              <h5 className="text-3xl font-bold text-primary">24h</h5>
              <span className="text-sm font-light text-white">
                Fast delivery
              </span>
            </div>
            <div className="">
              <h5 className="text-3xl font-bold text-primary">100%</h5>
              <span className="text-sm font-light text-white">
                Safe & secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
