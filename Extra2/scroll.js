console.log("scroll.js carregou!");

// Impede o navegador de forçar o scroll no topo
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const KEY = "scrollY:" + location.pathname;
let restaurando = true;
let ticking = false;

// Salva a posição sempre que você rolar
window.addEventListener(
  "scroll",
  () => {
    if (restaurando || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      localStorage.setItem(KEY, window.scrollY);
      ticking = false;
    });
  },
  { passive: true }
);

function restaurar() {
  const y = localStorage.getItem(KEY);
  if (y !== null) window.scrollTo(0, Number(y));
}

document.addEventListener("DOMContentLoaded", restaurar);

window.addEventListener("load", () => {
  restaurar();
  // reforça depois que imagens/fontes carregam
  setTimeout(() => {
    restaurar();
    restaurando = false;
  }, 300);
});