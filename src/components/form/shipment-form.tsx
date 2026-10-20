"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetHubs } from "@/hooks/hub.hook";
import { useCreateShipment } from "@/hooks/shipment.hook";
import { useGetZones } from "@/hooks/zone.hook";
import type { Hub } from "@/types/hub.type";
import type { CreateShipmentFormValues } from "@/validation";
import { createShipmentSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import {
  ListChecks,
  MapPin,
  MapPinned,
  Phone,
  SquareText,
  UserRound,
  Warehouse,
  Weight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const PAGE_SIZE = 20;

const DEFAULT_VALUES: CreateShipmentFormValues = {
  originZoneId: "",
  originHubId: "",

  destinationZoneId: "",
  destinationHubId: "",

  senderName: "",
  senderPhone: "",
  senderAddress: "",

  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",

  weight: 0,
  description: "",

  isFragile: false,
  pickupInstructions: "",
};

export default function CreateShipmentForm() {
  const [selectedOriginZoneId, setSelectedOriginZoneId] = useState("");
  const [selectedDestinationZoneId, setSelectedDestinationZoneId] =
    useState("");
  const [filteredOriginHubs, setFilteredOriginHubs] = useState<Hub[]>([]);
  const [filteredDestinationHubs, setFilteredDestinationHubs] = useState<Hub[]>(
    [],
  );

  const { mutate: createShipment, isPending } = useCreateShipment();

  const { data: zones, isLoading: loadingZones } = useGetZones({
    page: 1,
    limit: PAGE_SIZE,
  });

  const { data: hubs, isLoading: loadingHubs } = useGetHubs({
    page: 1,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    if (!hubs) {
      return;
    } else if (selectedOriginZoneId || selectedDestinationZoneId) {
      const originHubsFiltered = hubs.data.filter(
        (hub) => hub.zoneId === selectedOriginZoneId,
      );
      const destinationHubsFiltered = hubs.data.filter(
        (hub) => hub.zoneId === selectedDestinationZoneId,
      );
      setFilteredOriginHubs(originHubsFiltered);
      setFilteredDestinationHubs(destinationHubsFiltered);
    } else {
      setFilteredOriginHubs(hubs?.data);
      setFilteredDestinationHubs(hubs?.data);
    }
  }, [selectedOriginZoneId, selectedDestinationZoneId, hubs]);

  const form = useForm({
    defaultValues: DEFAULT_VALUES,

    validators: {
      onSubmit: createShipmentSchema,
    },

    onSubmit: async ({ value }) => {
      createShipment(value, {
        onSuccess: (response) => {
          console.log(value);
          if (!response.success) {
            toast.add({
              title: "Shipment creation failed",
              description:
                response.message ||
                "Unable to create shipment. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Shipment created",
            description: `Shipment has been created successfully. Please make payment to proceed.`,
            type: "success",
          });

          window.location.href = response.data.paymentUrl;
        },

        onError: (error) => {
          toast.add({
            title: "Shipment creation failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <form.Field name="senderName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Sender Full Name</FieldLabel>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter full name"
                    className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="senderPhone">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Sender Phone Number
                </FieldLabel>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="Enter phone no."
                    className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <div className="md:col-span-2">
          <form.Field name="senderAddress">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Sender Address</FieldLabel>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter address"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="address"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
        <form.Field name="receiverName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Receiver Full Name</FieldLabel>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter full name"
                    className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="receiverPhone">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Receiver Phone Number
                </FieldLabel>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="Enter phone no."
                    className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <div className="md:col-span-2">
          <form.Field name="receiverAddress">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Receiver Address</FieldLabel>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter address"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="address"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
        <form.Field name="originZoneId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const selectedZone = zones?.data?.find(
              (zone) => zone.id === field.state.value,
            );

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Origin Zone</FieldLabel>

                <div className="relative">
                  <MapPinned className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value ?? "");
                      setSelectedOriginZoneId(value as string);
                    }}
                    disabled={loadingZones}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="w-full border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <SelectValue
                        placeholder="Origin Zone"
                        className="h-11 rounded-md pl-7 pr-10 text-sm"
                      >
                        {selectedZone?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Origin Zone</SelectLabel>

                        {zones?.data?.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="originHubId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const selectedHub = hubs?.data?.find(
              (hub) => hub.id === field.state.value,
            );

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Origin Hub</FieldLabel>

                <div className="relative">
                  <Warehouse className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value ?? "");
                    }}
                    disabled={loadingHubs}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="w-full border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <SelectValue
                        placeholder="Origin Hub"
                        className="h-11 rounded-md pl-7 pr-10 text-sm"
                      >
                        {selectedHub?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Origin Hub</SelectLabel>

                        {filteredOriginHubs.map((hub) => (
                          <SelectItem key={hub.id} value={hub.id}>
                            {hub.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="destinationZoneId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const selectedZone = zones?.data?.find(
              (zone) => zone.id === field.state.value,
            );

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Destination Zone</FieldLabel>

                <div className="relative">
                  <MapPinned className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value ?? "");
                      setSelectedDestinationZoneId(value as string);
                    }}
                    disabled={loadingZones}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="w-full border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <SelectValue
                        placeholder="Destination Zone"
                        className="h-11 rounded-md pl-7 pr-10 text-sm"
                      >
                        {selectedZone?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Destination Zone</SelectLabel>

                        {zones?.data?.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="destinationHubId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            const selectedHub = hubs?.data?.find(
              (hub) => hub.id === field.state.value,
            );

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Destination Hub</FieldLabel>

                <div className="relative">
                  <Warehouse className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value ?? "");
                    }}
                    disabled={loadingHubs}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="w-full border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <SelectValue
                        placeholder="Destination Hub"
                        className="h-11 rounded-md pl-7 pr-10 text-sm "
                      >
                        {selectedHub?.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Destination Hub</SelectLabel>

                        {filteredDestinationHubs.map((hub) => (
                          <SelectItem key={hub.id} value={hub.id}>
                            {hub.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="weight">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Weight (in kilogram)
                </FieldLabel>
                <div className="relative">
                  <Weight className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="Enter weight in KG"
                    className="w-full h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="isFragile">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Is the parcel Fragile?
                </FieldLabel>
                <div className="relative">
                  <RadioGroup
                    defaultValue="comfortable"
                    className="w-fit flex gap-8 mt-3"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="r2" />
                      <Label htmlFor="r2">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id="r1" />
                      <Label htmlFor="r1">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="md:col-span-2">
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <div className="relative">
                    <SquareText className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter description"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <div className="md:col-span-2">
          <form.Field name="pickupInstructions">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Pickup Instructions
                  </FieldLabel>
                  <div className="relative">
                    <ListChecks className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter instructions"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
      </FieldGroup>
      <Button
        disabled={isPending}
        type="submit"
        className="mt-7 inline-flex w-full h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
      >
        {isPending ? (
          <>
            <Spinner /> Creating
          </>
        ) : (
          "Create"
        )}
      </Button>
    </form>
  );
}
