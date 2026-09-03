// Variantes de animação compartilhadas entre as seções do site.
export const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: "easeOut" as const } },
};

/**
 * Variante para quem pediu menos movimento no sistema.
 *
 * O site usa animação de entrada em quase toda seção, slideshow automático a
 * cada 5s e blobs em loop infinito. Para quem tem sensibilidade vestibular isso
 * é desconfortável — e `prefers-reduced-motion` é justamente o pedido explícito
 * de desligar. O conteúdo aparece na hora, sem deslocamento.
 */
export const revealSemMovimento = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};
