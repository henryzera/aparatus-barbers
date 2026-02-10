"use client";

import { useState } from "react";
import Image from "next/image";
import { BarbershopService, Barbershop } from "../generated/prisma/client";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import BookingSheet from "./booking-sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const formattedPrice = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-3">
      <div className="relative size-[110px] shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-card-foreground">
            {service.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-card-foreground">
            {formattedPrice}
          </p>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="sm"
                className="rounded-lg bg-[#26272b] px-4 py-2 text-sm font-bold text-white hover:bg-[#26272b]/90"
              >
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[370px] overflow-y-auto p-0">
              <BookingSheet service={service} barbershop={barbershop} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
