import { MessageCircle } from "lucide-react";

import { waLink } from "@/config/empresa";

export function WhatsAppFloating() {
  return (
    <a
      href={waLink("Olá! Gostaria de solicitar um orçamento à MV Construtora.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Entrar em contato com a MV Construtora no WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-4 pr-5 font-bold text-white shadow-2xl shadow-black/30 ring-4 ring-[#25D366]/25 transition-all hover:scale-[1.03] hover:bg-[#20BA5A]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <MessageCircle size={20} strokeWidth={2.2} />
      </span>
      <span className="hidden text-sm sm:inline">Fale conosco pelo WhatsApp</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-lg -z-10" />
    </a>
  );
}
