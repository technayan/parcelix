import AuthImage from "@/../public/assets/parcelix-auth.jpg";
import ResetPasswordForm from "@/components/form/reset-password-form";
import BackBtn from "@/components/modules/auth/back-btn";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center gap-2 md:justify-between">
          <Link
            className="flex items-center gap-2.5 text-[26px] lg:text-[30px] font-bold tracking-[-1.2px]"
            href="/"
            aria-label="Parcelix home"
          >
            <span>
              Parcel<span className="text-primary">ix</span>
            </span>
          </Link>
          <BackBtn />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Suspense fallback={<p>Loading...</p>}>
              <ResetPasswordForm />
            </Suspense>
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
