import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logomv from "@/assets/otimizadas/logomv.webp";
import { CTAButton } from "@/components/site/CTAButton";
import { MENU_COMPLETO, MENU_PRINCIPAL, hrefAbsoluto } from "@/config/navegacao";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const naHome = useRouterState({ select: (s) => s.location.pathname === "/" });

  const href = (h: string) => hrefAbsoluto(h, naHome);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href={naHome ? "#inicio" : "/"}
          aria-label="MV Construtora - início"
          className="flex items-center"
        >
          <img
            src={logomv}
            alt="MV Construtora"
            width={320}
            height={100}
            fetchPriority="high"
            className="h-11 w-auto sm:h-12"
          />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {MENU_PRINCIPAL.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CTAButton href={href("#contato")}>Solicitar orçamento</CTAButton>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-11 w-11 place-items-center text-white lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-zinc-950 px-5 py-6 lg:hidden"
        >
          {MENU_COMPLETO.map((item) => (
            <a
              key={item.href}
              href={href(item.href)}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-white/10 py-4 text-lg font-semibold text-white"
            >
              {item.rotulo}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
