import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppFloating } from "./WhatsAppFloating";

/**
 * Casca comum a todas as páginas: barra de progresso, header fixo, rodapé e o
 * botão flutuante do WhatsApp. Aplicada no __root para que cada página nova já
 * nasça com a navegação completa, sem duplicar código.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f4f0] text-zinc-950">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
      >
        Pular para o conteúdo
      </a>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-0.5 origin-left bg-red-500"
        style={{ scaleX }}
      />
      <Header />
      {children}
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
