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
  site: {
    kicker: "INVESTIMENTO",
    value: "R$ 730",
    description: "Criação do site. A publicação na internet e a hospedagem não estão incluídas.",
    includes: ["Site responsivo e personalizado", "Pagamento via Pix", "Domínio contratado pelo cliente, em nome do cliente"]
  },
  complete: {
    kicker: "PACOTE COMPLETO",
    value: "R$ 1.280",
    description: "Site com publicação na internet, hospedagem e 3 meses de manutenção incluídos.",
    includes: ["Criação e publicação do site", "3 meses de manutenção incluídos", "Adicionais de R$ 50 durante os 3 meses incluídos", "Domínio pago pelo cliente, em nome do cliente"]
  },
  maintenance: {
    kicker: "VALOR MENSAL",
    value: "R$ 85/mês",
    description: "Manutenção mensal de um site já desenvolvido. Escopo e condições são alinhados antes do início.",
    includes: ["Atualizações e ajustes dentro do escopo combinado", "Pagamento via Pix", "Não inclui domínio nem hospedagem"]
  },
  menu: {
    kicker: "ORÇAMENTO PERSONALIZADO",
    value: "Sob orçamento",
    description: "O valor depende da quantidade de produtos, categorias e recursos de pedido desejados.",
    includes: ["Cardápio adaptado para celular", "Produtos, preços e categorias", "Possibilidade de direcionar pedidos ao WhatsApp"]
  },
  catalog: {
    kicker: "ORÇAMENTO PERSONALIZADO",
    value: "Sob orçamento",
    description: "O valor depende da quantidade de produtos e de como você quer organizar o catálogo.",
    includes: ["Vitrine digital organizada", "Informações e imagens dos produtos", "Compartilhamento fácil com clientes"]
  },
  landing: {
    kicker: "ORÇAMENTO PERSONALIZADO",
    value: "Sob orçamento",
    description: "O valor depende do conteúdo, das integrações e dos objetivos da página.",
    includes: ["Página focada em uma oferta ou serviço", "Layout responsivo", "Botões de contato e conversão"]
  },
  system: {
    kicker: "ORÇAMENTO PERSONALIZADO",
    value: "Após avaliar o projeto",
    description: "Sistemas são orçados depois de definir as funcionalidades e o nível de complexidade.",
    includes: ["Escopo definido com o cliente", "Funcionalidades personalizadas", "Prazo e valor apresentados antes do desenvolvimento"]
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
    const message = encodeURIComponent("Olá! Tenho interesse no serviço: " + serviceChoice.options[serviceChoice.selectedIndex].text + ". Gostaria de conversar sobre os detalhes.");
    pricingContact.href = "https://www.instagram.com/yan.sitesemarcas/";
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
