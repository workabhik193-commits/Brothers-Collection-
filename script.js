/*
  BROTHERS COLLECTION — store settings
  1) Replace WHATSAPP_NUMBER below with your WhatsApp number including country code.
     India example: "919876543210" (no +, spaces or dashes).
  2) Edit the products list below with your real items, prices and descriptions.
*/
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // CHANGE THIS before publishing

const products = [
  {id:1,name:"Everyday Oversized Tee",category:"T-Shirts",price:499,description:"Relaxed fit · everyday comfort",tag:"BESTSELLER",art:"tee",color:"#c5c2b7"},
  {id:2,name:"Classic White Tee",category:"T-Shirts",price:399,description:"A clean essential for every day",tag:"ESSENTIAL",art:"tee",color:"#f3f0e8"},
  {id:3,name:"Casual Check Shirt",category:"Shirts",price:799,description:"Easy layering · casual look",tag:"NEW",art:"shirt",color:"#b7c2b0"},
  {id:4,name:"Streetwear Hoodie",category:"Hoodies",price:999,description:"A cosy layer for cooler days",tag:"POPULAR",art:"hoodie",color:"#b9b2c4"},
  {id:5,name:"Relaxed Cargo Pants",category:"Bottomwear",price:899,description:"Utility-inspired everyday style",tag:"TRENDING",art:"pants",color:"#c9b89b"},
  {id:6,name:"Minimal Black Tee",category:"T-Shirts",price:449,description:"Simple, versatile and easy to style",tag:"ESSENTIAL",art:"tee",color:"#777873"},
  {id:7,name:"Everyday Overshirt",category:"Shirts",price:849,description:"A smart casual layer",tag:"NEW",art:"shirt",color:"#c7a58e"},
  {id:8,name:"Comfy Joggers",category:"Bottomwear",price:699,description:"Relaxed comfort for daily wear",tag:"COMFORT",art:"pants",color:"#aab5bd"}
];
let cart = [];
let activeCategory = "All";

const money = n => "₹" + n.toLocaleString("en-IN");
function productArt(p) {
  const common = `fill="${p.color}" stroke="#222" stroke-width="2.5" stroke-linejoin="round"`;
  let shape = "";
  if (p.art === "tee") shape = `<path ${common} d="M68 65 L105 43 L127 55 L145 44 L182 65 L163 94 L148 84 L148 205 L91 205 L91 84 L77 94 Z"/><path d="M105 44 Q124 71 145 44" fill="none" stroke="#222" stroke-width="2.5"/>`;
  if (p.art === "shirt") shape = `<path ${common} d="M84 53 L109 40 L125 58 L141 40 L166 53 L190 79 L169 99 L154 82 L154 207 L96 207 L96 82 L81 99 L60 79 Z"/><path d="M109 40 L125 58 L141 40 L132 77 L125 85 L118 77 Z" fill="#eeeae0" stroke="#222" stroke-width="2"/><path d="M125 85 V202" stroke="#222" stroke-width="2"/>`;
  if (p.art === "hoodie") shape = `<path ${common} d="M91 69 Q80 58 67 72 L48 111 L72 126 L87 103 L91 211 L159 211 L163 103 L178 126 L202 111 L183 72 Q170 58 159 69 L144 82 L106 82 Z"/><path d="M106 82 Q100 47 125 43 Q150 47 144 82" fill="#d6d1c7" stroke="#222" stroke-width="2.5"/><path d="M111 84 L116 119 M139 84 L134 119" stroke="#222" stroke-width="2.5"/>`;
  if (p.art === "pants") shape = `<path ${common} d="M83 44 L167 44 L177 209 L135 209 L124 117 L113 209 L72 209 Z"/><path d="M83 44 H167 M125 45 V116" fill="none" stroke="#222" stroke-width="2.5"/><path d="M79 93 H105 V123 H79 Z M145 93 H170 V123 H145 Z" fill="none" stroke="#222" stroke-width="2"/>`;
  return `<svg viewBox="0 0 250 250" role="img" aria-label="${p.name} illustration"><ellipse cx="125" cy="219" rx="75" ry="8" fill="#000" opacity=".08"/>${shape}</svg>`;
}
function renderProducts() {
  const visible = products.filter(p => activeCategory === "All" || p.category === activeCategory);
  document.getElementById("product-grid").innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image">${productArt(p)}<span class="product-tag">${p.tag}</span></div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-row"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">+ ADD TO BAG</button></div>
      </div>
    </article>`).join("");
}
function openCart() {
  document.getElementById("cart-overlay").hidden = false;
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-overlay").hidden = true;
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function updateCart() {
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  document.getElementById("cart-count").textContent = count;
  document.getElementById("drawer-count").textContent = `(${count})`;
  document.getElementById("cart-total").textContent = money(total);
  const holder = document.getElementById("cart-items");
  if (!cart.length) { holder.innerHTML = '<p class="empty-cart">Your bag is waiting for something good.</p>'; return; }
  holder.innerHTML = cart.map(item=>`<div class="cart-item"><div class="mini-art">BC</div><div><div class="cart-item-name">${item.name}</div><div class="cart-item-price">${money(item.price)} each</div><div class="quantity"><button data-qty="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${item.id}">Remove</button></div>`).join("");
}
function toast(message) {
  const el=document.getElementById("toast"); el.textContent=message; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),1800);
}
function addToCart(id) {
  const p=products.find(x=>x.id===Number(id)); if(!p)return;
  const existing=cart.find(x=>x.id===p.id);
  if(existing)existing.qty++;else cart.push({...p,qty:1});
  updateCart(); toast("Added to your bag");
}
function validWhatsApp() {
  return /^\d{10,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
}
function orderOnWhatsApp() {
  if(!cart.length){toast("Add an item to your bag first");return;}
  if(!validWhatsApp()){toast("Shop owner: add your WhatsApp number in script.js first");return;}
  const lines=cart.map(x=>`• ${x.name} × ${x.qty} — ${money(x.price*x.qty)}`).join("\n");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const message=`Hello Brothers Collection! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(total)}\n\nMy name:\nDelivery address:\nSize/colour (if applicable):\nPlease confirm availability, delivery charges and final total.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.getElementById("product-grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(b.dataset.add);});
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
document.getElementById("cart-items").addEventListener("click",e=>{
  const q=e.target.closest("[data-qty]"); const r=e.target.closest("[data-remove]");
  if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));if(item){item.qty+=Number(q.dataset.change);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);updateCart();}}
  if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));updateCart();}
});
document.getElementById("open-cart").addEventListener("click",openCart);
document.getElementById("close-cart").addEventListener("click",closeCart);
document.getElementById("cart-overlay").addEventListener("click",closeCart);
document.getElementById("checkout").addEventListener("click",orderOnWhatsApp);
document.getElementById("clear-cart").addEventListener("click",()=>{cart=[];updateCart();});
document.getElementById("contact-whatsapp").addEventListener("click",e=>{if(!validWhatsApp()){e.preventDefault();toast("Shop owner: add your WhatsApp number in script.js first");}});
if(validWhatsApp()) document.getElementById("contact-whatsapp").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Brothers Collection! I have a question about your products.")}`;
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();updateCart();