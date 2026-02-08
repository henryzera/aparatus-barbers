import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PageSection, PageSectionTitle } from "@/app/_components/ui/page";
import { Separator } from "@/app/_components/ui/separator";
import ServiceItem from "@/app/_components/service-item";
import ContactInfo from "@/app/_components/contact-info";
import Footer from "@/app/_components/footer";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header com Banner */}
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
          priority
        />
        {/* Botão Voltar */}
        <div className="absolute left-5 top-6">
          <Button
            asChild
            size="icon"
            className="rounded-full bg-white text-foreground hover:bg-white/90"
          >
            <Link href="/">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Container de Conteúdo */}
      <div className="flex-1 rounded-tl-[24px] rounded-tr-[24px] bg-background">
        {/* Informações da Barbearia */}
        <div className="px-5 pt-6">
          <div className="flex items-start gap-2.5">
            <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={barbershop.imageUrl}
                alt={barbershop.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-foreground">
                {barbershop.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {barbershop.address}
              </p>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="px-5 py-6">
          <Separator />
        </div>

        {/* Seção Sobre Nós */}
        <PageSection>
          <div className="px-5">
            <PageSectionTitle>Sobre Nós</PageSectionTitle>
            <p className="mt-3 text-sm text-foreground">
              {barbershop.description}
            </p>
          </div>
        </PageSection>

        {/* Divisor */}
        <div className="px-5 py-6">
          <Separator />
        </div>

        {/* Seção Serviços */}
        <PageSection>
          <div className="px-5">
            <PageSectionTitle>Serviços</PageSectionTitle>
            <div className="mt-3 space-y-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>
        </PageSection>

        {/* Divisor */}
        <div className="px-5 py-6">
          <Separator />
        </div>

        {/* Seção Contato */}
        <PageSection>
          <div className="px-5">
            <PageSectionTitle>Contato</PageSectionTitle>
            <div className="mt-3">
              <ContactInfo phones={barbershop.phones} />
            </div>
          </div>
        </PageSection>

        {/* Footer */}
        <div className="mt-[60px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
