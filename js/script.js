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
  landing: {name:"LANDING PAGE",price:"R$ 350–600",description:"Página única para divulgar produto, serviço, oferta ou campanha."},
  institucional: {name:"SITE INSTITUCIONAL",price:"R$ 600–900",description:"Site profissional para apresentar empresa, serviços, diferenciais e contatos."},
  cardapio: {name:"CARDÁPIO E PEDIDOS",price:"R$ 700–1.200",description:"Cardápio digital com produtos e preços, com pedidos direcionados ao WhatsApp."},
  catalogo: {name:"CATÁLOGO DIGITAL",price:"R$ 300–600",description:"Vitrine online para organizar produtos e facilitar a consulta e o contato."},
  sistema: {name:"SISTEMA SOB MEDIDA",price:"A partir de R$ 1.200",description:"Projeto com cadastros, matrículas, área administrativa ou outras funcionalidades, conforme o escopo."}
};
const inlineQuote = document.querySelector("#pedido-servico");
const inlineQuoteForm = document.querySelector("#inline-quote-form");
let selectedServiceKey = "";
function selectService(key) {
  const selected = serviceOptions[key];
  if (!selected || !inlineQuote) return;
  selectedServiceKey = key;
  document.querySelector("#inline-service-name").textContent = selected.name;
  document.querySelector("#inline-service-price").textContent = selected.price;
  document.querySelector("#inline-service-description").textContent = selected.description;
  document.querySelector("#inline-quote-title").textContent = "Conte sobre seu projeto.";
  inlineQuote.hidden = false;
  inlineQuote.scrollIntoView({behavior:"smooth", block:"start"});
}
document.querySelectorAll(".service-select").forEach(button => {
  button.addEventListener("click", () => selectService(button.dataset.service));
});
if (inlineQuoteForm) {
  inlineQuoteForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(inlineQuoteForm);
    const selected = serviceOptions[selectedServiceKey];
    if (!selected) return;
    const fields = [
      ["Serviço escolhido", selected.name],
      ["Investimento estimado", selected.price],
      ["Nome", data.get("nome")],
      ["Estabelecimento / marca", data.get("estabelecimento")],
      ["WhatsApp", data.get("whatsapp")],
      ["E-mail", data.get("email") || "Não informado"],
      ["Detalhes do projeto", data.get("detalhes")],
      ["Observações adicionais", data.get("observacoes") || "Nenhuma"]
    ];
    const message = "Olá, Yan! Gostaria de solicitar um orçamento.\n\n" +
      fields.map(([label, value]) => label + ": " + String(value || "").trim()).join("\n\n");
    window.open("https://wa.me/5585988159854?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  });
}

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
