"use client";

import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BarbershopService, Barbershop } from "../generated/prisma/client";

interface BookingSheetProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

const BookingSheet = ({ service, barbershop }: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  const timeSlots = generateTimeSlots();

  const priceInReais = service.priceInCents / 100;
  const formattedPrice = priceInReais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const formattedDate = selectedDate
    ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR })
    : "";

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    
    console.log({
      service: service.name,
      barbershop: barbershop.name,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-lg font-bold">Fazer Reserva</h2>
      </div>

      {/* Separator */}
      <div className="py-6">
        <Separator />
      </div>

      {/* Calendário */}
      <div className="px-5">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={ptBR}
          fromDate={new Date()}
          disabled={(date) => date < new Date()}
          className="w-full"
        />
      </div>

      {/* Grid de Horários */}
      {selectedDate && (
        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border border-border bg-background hover:bg-accent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card de Resumo */}
      {selectedDate && selectedTime && (
        <div className="mt-6 px-5">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-card-foreground">
                {service.name}
              </h3>
              <p className="text-base font-bold text-card-foreground">
                {formattedPrice}
              </p>
            </div>

            <Separator className="my-3" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data</span>
                <span className="text-sm font-medium text-foreground">
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Horário</span>
                <span className="text-sm font-medium text-foreground">
                  {selectedTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Barbearia</span>
                <span className="text-sm font-medium text-foreground">
                  {barbershop.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão Confirmar */}
      <div className="mt-auto px-5 pb-6">
        <Button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="w-full"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default BookingSheet;
