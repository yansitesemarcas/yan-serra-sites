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

const serviceChoice = document.querySelector("#service-choice");
const priceKicker = document.querySelector("#price-kicker");
const priceValue = document.querySelector("#price-value");
const priceDescription = document.querySelector("#price-description");
const priceIncludes = document.querySelector("#price-includes");
const pricingContact = document.querySelector("#pricing-contact");

const servicePrices = {
  landing: {
    kicker: "INVESTIMENTO",
    value: "R$ 600,00",
    description: "Página simples, sem muita complexidade, indicada para apresentar um serviço, produto ou oferta.",
    includes: ["Layout responsivo e personalizado", "Pagamento exclusivamente via Pix", "Hospedagem e domínio por conta do cliente"]
  },
  institutional: {
    kicker: "INVESTIMENTO",
    value: "R$ 700,00",
    description: "Site institucional para apresentar a empresa, seus serviços e um volume maior de informações.",
    includes: ["Estrutura e conteúdo definidos no escopo", "Pagamento exclusivamente via Pix", "Hospedagem e domínio por conta do cliente"]
  },
  menu: {
    kicker: "INVESTIMENTO",
    value: "R$ 1.000,00",
    description: "Cardápio digital com pedidos e painel administrativo. Funcionalidades são definidas no escopo do projeto.",
    includes: ["Gerenciamento de produtos e informações pelo painel", "Pagamento exclusivamente via Pix", "Hospedagem e domínio por conta do cliente"]
  },
  catalog: {
    kicker: "INVESTIMENTO",
    value: "R$ 1.000,00",
    description: "Catálogo digital com painel administrativo para organizar e gerenciar os produtos.",
    includes: ["Vitrine digital e painel administrativo", "Pagamento exclusivamente via Pix", "Hospedagem e domínio por conta do cliente"]
  },
  menuPackage: {
    kicker: "PACOTE COM MANUTENÇÃO",
    value: "R$ 1.300,00",
    description: "Cardápio digital com pedidos e painel, incluindo cinco meses de manutenção e adicionais ilimitados durante esse período, conforme as condições acordadas.",
    includes: ["Cinco meses de manutenção", "Adicionais ilimitados durante os cinco meses, conforme escopo acordado", "Hospedagem e domínio por conta do cliente"]
  },
  catalogPackage: {
    kicker: "PACOTE COM MANUTENÇÃO",
    value: "R$ 1.300,00",
    description: "Catálogo digital com painel, incluindo cinco meses de manutenção e adicionais ilimitados durante esse período, conforme as condições acordadas.",
    includes: ["Cinco meses de manutenção", "Adicionais ilimitados durante os cinco meses, conforme escopo acordado", "Hospedagem e domínio por conta do cliente"]
  },
  maintenance: {
    kicker: "VALOR MENSAL",
    value: "R$ 85,00/mês",
    description: "Manutenção mensal por mês completo, mediante contratação.",
    includes: ["Escopo de manutenção combinado previamente", "Pagamento exclusivamente via Pix", "Novas funcionalidades podem ter orçamento separado"]
  },
  system: {
    kicker: "ORÇAMENTO PERSONALIZADO",
    value: "A definir",
    description: "O escopo e o preço de sistemas personalizados são definidos diretamente com Yan Serra antes do início.",
    includes: ["Funcionalidades e prazo acordados previamente", "Parcelamento somente mediante negociação", "Hospedagem e domínio por conta do cliente"]
  }
};

function updateServicePrice() {
  if (!serviceChoice || !servicePrices[serviceChoice.value]) return;
  const item = servicePrices[serviceChoice.value];
  priceKicker.textContent = item.kicker;
  priceValue.textContent = item.value;
  priceDescription.textContent = item.description;
  priceIncludes.replaceChildren(...item.includes.map(text => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }));
  if (pricingContact) {
    const message = encodeURIComponent("Olá! Tenho interesse no serviço: " + serviceChoice.options[serviceChoice.selectedIndex].text + ". Gostaria de conversar sobre os detalhes e valores. Forma de pagamento via Pix. Parcelamento e adicionais devem ser definidos previamente com Yan Serra.");
    pricingContact.href = "https://wa.me/5585988159854?text=" + message;
    pricingContact.setAttribute("aria-label", "Solicitar orçamento para " + serviceChoice.options[serviceChoice.selectedIndex].text);
  }
}
if (serviceChoice) {
  serviceChoice.addEventListener("change", updateServicePrice);
  updateServicePrice();
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
