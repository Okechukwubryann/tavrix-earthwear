const container = document.getElementById("products");

let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Earth Hoodie", price: 45, image: "hoodie.jpg" },
  { name: "Street Tee", price: 25, image: "tee.jpg" },
  { name: "Utility Pants", price: 40, image: "pants.jpg" }
];

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
  `;

  container.appendChild(div);
});