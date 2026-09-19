const state = { products: [], category: "All", search: "" };
const grid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const modal = document.querySelector("#product-modal");
const modalContent = document.querySelector("#modal-content");

const money = (value) => `రూ. ${value.toLocaleString("en-IN")}`;

function productCard(product, index) {
  return `
    <article class="product-card" style="--delay: ${index * 70}ms">
      <button class="product-image-button" data-product-id="${product.id}" aria-label="${product.name} వివరాలు చూడండి">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <span class="view-detail">వివరాలు చూడండి <span aria-hidden="true">↗</span></span>
      </button>
      <div class="product-info"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><strong>${money(product.price)}</strong></div>
      <p class="product-meta">${product.weight} · ${product.carat}</p>
    </article>`;
}

function renderProducts() {
  const query = state.search.toLowerCase();
  const visible = state.products.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const matchesSearch = !query || `${product.name} ${product.category} ${product.short_description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  grid.innerHTML = visible.map(productCard).join("");
  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;
  grid.querySelectorAll("[data-product-id]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.productId)));
}

function openModal(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  modalContent.innerHTML = `
    <div class="modal-image"><img src="${product.image}" alt="${product.name}"><span>${product.tag}</span></div>
    <div class="modal-details"><p class="eyebrow">${product.category} · ${product.occasion}</p><h2 id="modal-title">${product.name}</h2><p class="modal-description">${product.description}</p>
      <div class="price-highlight"><span>అంచనా ధర</span><strong>${money(product.price)}</strong><small>ప్రస్తుత బంగారం ధర మరియు సైజు ఆధారంగా తుది ధర మారవచ్చు.</small></div>
      <div class="detail-list"><div><span>బంగారం స్వచ్ఛత</span><strong>${product.carat}</strong></div><div><span>బంగారం బరువు</span><strong>${product.weight}</strong></div><div><span>బంగారం ధర</span><strong>${money(product.gold_rate)} / గ్రాము</strong></div><div><span>తయారీ ఛార్జీలు</span><strong>${money(product.making_charge)} (${product.making_percent}%)</strong></div><div><span>తరుగు శాతం</span><strong>${product.wastage_percent}% · ${money(product.wastage_value)}</strong></div><div><span>రాళ్లు / మెరుగు</span><strong>${product.stones}</strong></div></div>
      <p class="delivery-note"><span>లభ్యత</span>${product.delivery}</p><a class="button button-dark modal-cta" href="#visit" data-close-modal>నగను చూడటానికి బుక్ చేయండి <span aria-hidden="true">↗</span></a>
    </div>`;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
  state.category = button.dataset.category;
  document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
  renderProducts();
}));
document.querySelector("#search-input").addEventListener("input", (event) => { state.search = event.target.value; renderProducts(); });
modal.addEventListener("click", (event) => { if (event.target.hasAttribute("data-close-modal")) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

fetch("/api/products").then((response) => response.json()).then((products) => { state.products = products; renderProducts(); }).catch(() => { emptyState.hidden = false; emptyState.textContent = "ఆభరణాల సేకరణ లోడ్ కాలేదు. పేజీని మళ్లీ తెరవండి."; });
