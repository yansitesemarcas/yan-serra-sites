const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }));
}


const serviceOptions = {
  landing: {name:"LANDING PAGE",price:"R$ 600,00",description:"Página única para divulgar uma oferta, apresentar um serviço ou transformar visitas em contatos."},
  institucional: {name:"SITE INSTITUCIONAL",price:"R$ 700,00",description:"Site profissional para apresentar empresa, serviços, diferenciais e canais de contato."},
  cardapio: {name:"CARDÁPIO DIGITAL COM PEDIDOS E PAINEL",price:"R$ 1.000,00",description:"Cardápio digital com produtos, pedidos e painel para administrar o conteúdo do estabelecimento."},
  catalogo: {name:"CATÁLOGO DIGITAL COM PAINEL",price:"R$ 1.000,00",description:"Vitrine online de produtos com painel para organizar e atualizar o catálogo."},
  pacote: {name:"PACOTE DE CARDÁPIO OU CATÁLOGO COM MANUTENÇÃO",price:"R$ 1.300,00",description:"Cardápio digital com pedidos e painel ou catálogo digital com painel, incluindo cinco meses de manutenção."},
  manutencao: {name:"MANUTENÇÃO AVULSA",price:"R$ 85,00 por mês completo",description:"Manutenção contratada separadamente, cobrada por mês completo."}
};
const introFollowup = document.querySelector("#intro-followup");
if (introFollowup) {
  const revealIntroDetails = () => {
    if (window.scrollY > 80) {
      introFollowup.classList.add("is-visible");
      window.removeEventListener("scroll", revealIntroDetails);
    }
  };
  window.addEventListener("scroll", revealIntroDetails, {passive:true});
  revealIntroDetails();
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".service-card, .project-card, .about-stamp, .about-copy, .contact-panel");
if ("IntersectionObserver" in window) {
  revealTargets.forEach(element => element.classList.add("reveal"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add("is-visible"));
}
