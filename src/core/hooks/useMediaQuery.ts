import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    // Atualiza a correspondência inicial
    setMatches(mediaQueryList.matches);

    // Adiciona um event listener para mudanças
    mediaQueryList.addEventListener("change", handleChange);

    // Limpa o event listener quando o componente é desmontado
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
