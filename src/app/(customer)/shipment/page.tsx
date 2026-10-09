import RegisterImg from "@/../public/assets/parcelix-register.jpg";
import CreateShipmentForm from "@/components/form/shipment-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 mt-16">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="block">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Create Shipment
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter the shipment details to create your parcel.
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full mt-6">
            <CreateShipmentForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={RegisterImg}
          width={1000}
          height={1000}
          alt="Picture of a courier"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
