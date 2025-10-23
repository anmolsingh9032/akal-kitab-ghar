// 📚 Book Data
const books = [
  { title: "The Real Reason Why Legend Died", author: "MANJINDER MAKHA", price: 450, image: "1.jpeg", category: "Biography" },
  { title: "ਪਹਿਲੀ ਕਿਤਾਬ", author: "Sukhpreet Singh", price: 350, image: "img 2.jpg", category: "Novel" },
  { title: "ਹੰਨੈ ਹੰਨੈ ਪਾਤਸ਼ਾਹੀ", author: "ਜਗਦੀਪ ਸਿੰਘ", price: 650, image: "ਹੰਨੈ ਹੰਨੈ ਪਾਤਸ਼ਾਹੀ.jpg", category: "History" },
  { title: "SAHEED KARTAR SINGH SRABHA", author: "ਅਜਮੇਰ ਸਿੰਘ", price: 350, image: "SAHEED KARTAR SINGH SRABHA.jpeg", category: "Biography" },
  { title: "ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ", author: "ਸੁਖਦਿਆਲ ਸਿੰਘ", price: 350, image: "4.jpeg", category: "History" },
  { title: "ਚਾਲੀ ਦਿਨ", author: "Gurpreet Singh Dhugga", price: 250, image: "7.jpeg", category: "Novel" },
  { title: "ਪਵਿੱਤਰ ਪਾਪੀ", author: "ਨਾਨਕ ਸਿੰਘ", price: 200, image: "5.jpg", category: "Novel" },
];

// 🛒 Cart Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedBook = null;

// 🖼 Render Books
function renderBooks(list = books) {
  const grid = document.getElementById("books-list");
  grid.innerHTML = "";
  list.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <p class="price">₹${book.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
      <button onclick="openOrderForm(${index})">Buy It Now</button>
    `;
    grid.appendChild(div);
  });
}

// 🛒 Add to Cart
function addToCart(index) {
  cart.push(books[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartCount").textContent = cart.length;
  alert(`${books[index].title} added to cart!`);
}

// 🛍️ Open Cart
function openCart() {
  const modal = document.getElementById("cart-modal");
  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    itemsDiv.innerHTML += `
      <div>${item.title} - ₹${item.price}
      <button onclick="removeFromCart(${i})">❌</button></div>
    `;
  });

  document.getElementById("cart-total").innerText = "Total: ₹" + total;
  modal.classList.add("active");
}

// ❌ Remove from Cart
function removeFromCart(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartCount").textContent = cart.length;
  openCart();
}

// 🧾 Checkout
function checkout() {
  alert("Thank you for your purchase!");
  window.print(); // lets user save as PDF
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  closeCart();
  document.getElementById("cartCount").textContent = 0;
}

// 🛑 Close Cart
function closeCart() {
  document.getElementById("cart-modal").classList.remove("active");
}

// 📖 Order Form
function openOrderForm(index) {
  selectedBook = books[index];
  document.getElementById("overlay").classList.add("active");
  document.getElementById("order-form").classList.add("active");
}

function closeForm() {
  document.getElementById("overlay").classList.remove("active");
  document.getElementById("order-form").classList.remove("active");
}

document.getElementById("orderDetails").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  alert(`Thank you ${name}! Your order for '${selectedBook.title}' is placed.`);
  closeForm();
});

// 🔍 Search
function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
  );
  renderBooks(filtered);
}

// 🏷 Filter by Category
function filterCategory(category) {
  if (category === "All") renderBooks(books);
  else renderBooks(books.filter(b => b.category === category));
}

// 🌙 Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Load everything
window.onload = () => {
  renderBooks();
  document.getElementById("cartCount").textContent = cart.length;
};

