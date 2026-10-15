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


// Orçamento em janela modal: o cliente permanece na tela do serviço escolhido.
const quoteModalMarkup = `
  <div class="quote-modal" id="quote-modal" hidden>
    <div class="quote-modal-backdrop" data-close-quote></div>
    <section class="quote-modal-panel" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <button class="quote-modal-close" type="button" aria-label="Fechar formulário" data-close-quote>×</button>
      <p class="eyebrow"><span class="eyebrow-line"></span> SOLICITAÇÃO DE PROJETO</p>
      <h2 id="quote-modal-title">Conte sobre seu projeto.</h2>
      <p class="quote-modal-intro">Preencha os dados para preparar uma mensagem completa para o WhatsApp.</p>
      <div class="quote-modal-service" id="quote-modal-service"></div>
      <form id="quote-modal-form" class="quote-form">
        <div class="form-field"><label for="quote-name">Seu nome *</label><input id="quote-name" name="name" required autocomplete="name" placeholder="Seu nome completo"></div>
        <div class="form-field"><label for="quote-business">Estabelecimento / marca *</label><input id="quote-business" name="business" required placeholder="Nome do negócio"></div>
        <div class="form-field"><label for="quote-phone">Seu WhatsApp *</label><input id="quote-phone" name="phone" required inputmode="tel" autocomplete="tel" placeholder="(DDD) 9XXXX-XXXX"></div>
        <div class="form-field"><label for="quote-email">E-mail</label><input id="quote-email" name="email" type="email" autocomplete="email" placeholder="voce@email.com"></div>
        <div class="form-field form-field-wide"><label for="quote-notes">Observações sobre o projeto</label><textarea id="quote-notes" name="notes" placeholder="Conte um pouco sobre o que você precisa..."></textarea></div>
        <div class="form-submit form-field-wide"><p>Ao continuar, o WhatsApp será aberto com os dados preenchidos para você enviar a solicitação.</p><button class="button button-light" type="submit">Continuar pelo WhatsApp <span>↗</span></button></div>
      </form>
    </section>
  </div>`;
if (!document.querySelector("#quote-modal")) {
  document.body.insertAdjacentHTML("beforeend", quoteModalMarkup);
}
const quoteModal = document.querySelector("#quote-modal");
const quoteModalService = document.querySelector("#quote-modal-service");
const quoteModalForm = document.querySelector("#quote-modal-form");
let activeServiceKey = null;
function openQuoteModal(key) {
  const service = serviceOptions[key];
  if (!service || !quoteModal) return;
  activeServiceKey = key;
  quoteModalService.innerHTML = `<span class="quote-modal-label">SERVIÇO SELECIONADO</span><strong>${service.name}</strong><b>${service.price}</b><p>${service.description}</p>`;
  quoteModal.hidden = false;
  document.body.classList.add("quote-modal-open");
  const nameField = quoteModal.querySelector("#quote-name");
  if (nameField) nameField.focus({preventScroll:true});
}
function closeQuoteModal() {
  if (!quoteModal) return;
  quoteModal.hidden = true;
  document.body.classList.remove("quote-modal-open");
}
document.querySelectorAll(".service-select[data-service]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    openQuoteModal(button.dataset.service);
  });
});
quoteModal?.querySelectorAll("[data-close-quote]").forEach(button => button.addEventListener("click", closeQuoteModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && quoteModal && !quoteModal.hidden) closeQuoteModal();
});
quoteModalForm?.addEventListener("submit", event => {
  event.preventDefault();
  const service = serviceOptions[activeServiceKey];
  if (!service) return;
  const data = new FormData(quoteModalForm);
  const message = [
    "SOLICITAÇÃO DE PROJETO — YAN SERRA SITES E MARCAS",
    "",
    "Serviço: " + service.name,
    "Investimento anunciado: " + service.price,
    "Nome: " + data.get("name"),
    "Estabelecimento / marca: " + data.get("business"),
    "WhatsApp: " + data.get("phone"),
    "E-mail: " + (data.get("email") || "Não informado"),
    "Observações: " + (data.get("notes") || "Não informado")
  ].join("\n");
  window.open("https://wa.me/5585988159854?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
});
