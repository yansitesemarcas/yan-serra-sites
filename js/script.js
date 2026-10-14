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
