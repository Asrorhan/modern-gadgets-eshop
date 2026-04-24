// elements
const productContainer = document.getElementById("product-section");
const heroBtn = document.getElementById("hero-btn");
const bagIcon = document.getElementById("bag");
const heartFilter = document.getElementById("heart-filter");
const searchInput = document.querySelector(".search");
const modal = document.querySelector(".modal");
const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const langSelect = document.getElementById("languages");

// localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("selectedLang", langSelect.value);
}

function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return localStorage.getItem("selectedLang") || "en";
}

let currentTranslations = {};

// products data
const products = [
  {
    id: 1,
    name: "AirPods",
    price: 25,
    img: "images/airpods.png",
  },
  {
    id: 2,
    name: "Headphones",
    price: 85,
    img: "images/headphone.jpg",
  },
  {
    id: 3,
    name: "Aurora Speaker",
    price: 1750,
    img: "images/Aurora.png",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 299,
    img: "images/smart-watch.png",
  },
  {
    id: 5,
    name: "PlayStation Controller",
    price: 61,
    img: "images/playstation-pult.jpg",
  },
  {
    id: 6,
    name: "VR Glasses",
    price: 599,
    img: "images/vr-glasses.jfif",
  },
];

let cart = [];
let favorites = [];
let isShowingFavs = false;

// 1. render function
function renderProducts(data = products) {
  productContainer.innerHTML = data
    .map((product) => {
      const isFav = favorites.includes(product.id) ? "active" : "";

      const name =
        currentTranslations.products?.[product.id]?.name || product.name;
      const desc =
        currentTranslations.products?.[product.id]?.desc || product.desc;

      return `
      <div class="card">
        <span class="material-symbols-outlined fav-icon ${isFav}" data-id="${product.id}">favorite</span>
        <img src="${product.img}" alt="${name}">
        <div class="card_body">
          <h5>${name}</h5>
          <p>${desc || ""}</p>
          <p><strong>€${product.price}</strong></p>
          <button class="addBtn" data-id="${product.id}">${currentTranslations.add_to_cart}</button>
        </div>
      </div>`;
    })
    .join("");
}

async function changeLanguage(lang) {
  try {
    const response = await fetch(`${lang}.json`);
    currentTranslations = await response.json();

    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (currentTranslations[key]) {
        if (el.tagName === "INPUT") {
          el.placeholder = currentTranslations[key];
        } else {
          el.textContent = currentTranslations[key];
        }
      }
    });

    saveToStorage();
    renderProducts();
    updateUI();
  } catch (error) {
    console.error("Error loading language", error);
  }
}

// 2. search logic
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

// 3. heart filter logic
heartFilter.addEventListener("click", () => {
  isShowingFavs = !isShowingFavs;
  if (isShowingFavs) {
    const favItems = products.filter((p) => favorites.includes(p.id));
    renderProducts(favItems);
    heartFilter.style.color = "red";
  } else {
    renderProducts(products);
    heartFilter.style.color = "";
  }
});

// 4. delegate click (Heart + Add to Cart)
productContainer.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains("fav-icon")) {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
      e.target.classList.remove("active");
    } else {
      favorites.push(id);
      e.target.classList.add("active");
    }
    saveToStorage();
  }

  if (e.target.classList.contains("addBtn")) {
    const product = products.find((p) => p.id === id);
    const inCart = cart.find((item) => item.id === id);

    if (inCart) inCart.qty++;
    else cart.push({ ...product, qty: 1 });

    saveToStorage();

    alert(
      `${currentTranslations.products[product.id].name} ${currentTranslations.added_to_bag}`,
    );

    updateUI();
  }
});

// 5. cart UI
function updateUI() {
  const emptyMsg = currentTranslations.empty_cart;
  cartList.innerHTML = cart.length === 0 ? `<li>${emptyMsg}</li>` : "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const translatedName =
      currentTranslations.products?.[item.id]?.name || item.name;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <h4>${translatedName} (x${item.qty}) €${item.price * item.qty}</h4>
      <div class="cart-qty">
        <img src="${item.img}" alt="${translatedName}">
        <button onclick="changeQty(${index}, -1)" class="qty-btn">
          <span class="material-symbols-outlined">remove</span>
        </button>
        <button onclick="changeQty(${index}, 1)" class="qty-btn">
          <span class="material-symbols-outlined">add</span>
        </button>
        <button onclick="remove(${index})" class="remove-btn">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>`;
    cartList.appendChild(li);
  });

  totalPriceEl.textContent = total;
}

// 6. window function
window.changeQty = (idx, amt) => {
  cart[idx].qty += amt;
  if (cart[idx].qty < 1) remove(idx);
  saveToStorage();
  updateUI();
};

window.remove = (idx) => {
  cart.splice(idx, 1);
  saveToStorage();
  updateUI();
};

// modal
heroBtn.addEventListener("click", () =>
  productContainer.scrollIntoView({ behavior: "smooth" }),
);

bagIcon.addEventListener("click", () => (modal.style.display = "flex"));

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

langSelect.addEventListener("change", (e) => {
  changeLanguage(e.target.value);
  saveToStorage();
});

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = loadFromStorage();
  langSelect.value = savedLang;
  changeLanguage(savedLang);

  renderProducts();
  updateUI();
});
