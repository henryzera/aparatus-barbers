"use client";

import { Button } from "./ui/button";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";

interface ContactInfoProps {
  phones: string[];
}

const ContactInfo = ({ phones }: ContactInfoProps) => {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado para a área de transferência");
  };

  return (
    <div className="space-y-3">
      {phones.map((phone, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="size-6 text-foreground" />
            <p className="text-sm text-foreground">{phone}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyPhone(phone)}
            className="rounded-lg px-4 py-2 text-sm font-bold"
          >
            Copiar
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
