// Variantes de animação compartilhadas entre as seções do site.
export const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: "easeOut" as const } },
};
