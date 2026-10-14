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


const quoteForm = document.querySelector("#quote-form");
if (quoteForm) {
  quoteForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const fields = [
      ["Serviço escolhido", serviceOptions[data.get("servico")] ? serviceOptions[data.get("servico")].name + " — " + serviceOptions[data.get("servico")].price : "Não selecionado"],
      ["Nome", data.get("nome")],
      ["Estabelecimento / marca", data.get("estabelecimento")],
      ["WhatsApp", data.get("whatsapp")],
      ["E-mail", data.get("email") || "Não informado"],
      ["Detalhes do projeto", data.get("detalhes")],
      ["Observações adicionais", data.get("observacoes") || "Nenhuma"]
    ];
    const message = "Olá, Yan! Gostaria de solicitar um orçamento.\n\n" +
      fields.map(([label, value]) => label + ": " + String(value).trim()).join("\n\n");
    window.open("https://wa.me/5585988159854?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  });
}


const serviceChoice = document.querySelector("#service-choice");
const serviceSummary = document.querySelector("#selected-service-summary");
const serviceName = document.querySelector("#selected-service-name");
const servicePrice = document.querySelector("#selected-service-price");
const serviceDescription = document.querySelector("#selected-service-description");
const serviceOptions = {
  landing: {name:"LANDING PAGE",price:"R$ 350–600",description:"Página única para divulgar produto, serviço, oferta ou campanha."},
  institucional: {name:"SITE INSTITUCIONAL",price:"R$ 600–900",description:"Site profissional para apresentar a empresa, os serviços, os diferenciais e os contatos."},
  cardapio: {name:"CARDÁPIO E PEDIDOS",price:"R$ 700–1.200",description:"Cardápio digital com produtos e preços, com pedidos direcionados ao WhatsApp."},
  catalogo: {name:"CATÁLOGO DIGITAL",price:"R$ 300–600",description:"Vitrine online para organizar produtos e facilitar a consulta e o contato."},
  sistema: {name:"SITE COM SISTEMA OU PAINEL",price:"A partir de R$ 1.200",description:"Projeto com cadastros, matrícula, área administrativa ou outras funcionalidades, conforme o escopo."}
};
function updateSelectedService() {
  if (!serviceChoice || !serviceSummary) return;
  const selected = serviceOptions[serviceChoice.value];
  if (!selected) { serviceSummary.hidden = true; return; }
  serviceName.textContent = selected.name;
  servicePrice.textContent = selected.price;
  serviceDescription.textContent = selected.description;
  serviceSummary.hidden = false;
}
if (serviceChoice) {
  serviceChoice.addEventListener("change", updateSelectedService);
  document.querySelectorAll('a[href="#orcamento"]').forEach(link => {
    link.addEventListener("click", () => {
      const text = (link.textContent || "").toLowerCase();
      window.setTimeout(() => {
        if (text.includes("institucional") || text.includes("quero um site")) serviceChoice.value = "institucional";
        else if (text.includes("cardápio")) serviceChoice.value = "cardapio";
        else if (text.includes("catálogo")) serviceChoice.value = "catalogo";
        else if (text.includes("landing") || text.includes("página")) serviceChoice.value = "landing";
        else if (text.includes("sistema") || text.includes("painel")) serviceChoice.value = "sistema";
        updateSelectedService();
      }, 150);
    });
  });
}
const introFollowup = document.querySelector("#intro-followup");
if (introFollowup && "IntersectionObserver" in window) {
  const introObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { introFollowup.classList.add("is-visible"); introObserver.disconnect(); }
    });
  }, { threshold: 0.5 });
  introObserver.observe(introFollowup);
} else if (introFollowup) introFollowup.classList.add("is-visible");

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
