import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex grow flex-col items-center justify-center ">
      <div className="galactic-hub-background h-screen w-screen"></div>
      <div className="relative z-10 flex w-full max-w-4xl h-screen flex-col items-center justify-center xl:px-40 text-center gap-8 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-mono text-4xl font-extrabold  md:text-5xl lg:text-6xl">
            Um link,<br /><span className="text-primary">tudo conectado.</span>
          </h1>
          <h2 className="text-lg text-muted-foreground">
            Reúna tudo o que importa em um só link. Simples, rápido e do <p className="font-bold">seu jeito.</p>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Button className="w-1/2">
            <Link href='/login'>
              Entrar
            </Link>
          </Button>
          <Button variant='secondary' className="w-1/2 hover:bg-primary hover:text-primary-foreground">
            <Link href='/signup'>
              Criar conta
            </Link>
          </Button>
        </div>
      </div>
      <div className="network-node top-[10%] left-[15%]"></div>
      <div className="network-node top-[25%] right-[10%]"></div>
      <div className="network-node top-[45%] left-[5%]"></div>
      <div className="network-node top-[60%] right-[20%]"></div>
      <div className="network-node bottom-[10%] left-[30%]"></div>
      <div className="network-node bottom-[25%] right-[5%]"></div>
      <div className="network-node top-[5%] right-[35%]"></div>
      <div className="network-node bottom-[5%] left-[60%]"></div>
      <div className="network-line left-[10%] top-[20%] w-[30%] rotate-[-30deg]"></div>
      <div className="network-line right-[10%] top-[30%] w-[25%] rotate-45"></div>
      <div className="network-line left-[20%] bottom-[15%] w-[40%] rotate-10"></div>
      <div className="network-line right-[15%] bottom-[20%] w-[35%] rotate-[-20deg]"></div>
      <div className="network-line left-[40%] top-[5%] w-[20%] rotate-60"></div>
    </div>
  );
}
