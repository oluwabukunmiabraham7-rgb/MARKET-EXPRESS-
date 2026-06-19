// app.js - Corrected Load Logic
import { db, collection, onSnapshot } from './firebase.js';

let cart = JSON.parse(localStorage.getItem('enitan_cart')) || [];

async function loadProducts(searchTerm = "") {
    const grid = document.getElementById('productGrid');
    const noResult = document.getElementById('noResult');
    const loader = document.getElementById('loader');
    const title = document.getElementById('viewTitle');

    // Show the loader and hide the results/error screens while we fetch
    if(loader) loader.classList.remove('hidden');
    grid.classList.add('hidden');
    noResult.classList.add('hidden');

    onSnapshot(collection(db, "products"), (snapshot) => {
        let items = [];
        grid.innerHTML = '';
        
        // Hide loader now that we have an answer from Firebase
        if(loader) loader.classList.add('hidden');

        snapshot.forEach(doc => {
            const p = doc.data();
            const id = doc.id;
            const tags = p.searchTags || "";
            
            if (searchTerm === "" || tags.includes(searchTerm.toLowerCase())) {
                items.push({id, ...p});
            }
        });

        if (items.length === 0) {
            // ONLY show noResult if we actually finished searching and found nothing
            grid.classList.add('hidden');
            noResult.classList.remove('hidden');
            title.innerText = searchTerm === "" ? "Our Store is Empty" : "No Results Found";
        } else {
            grid.classList.remove('hidden');
            noResult.classList.add('hidden');
            title.innerText = searchTerm === "" ? "Featured Products" : `Results for "${searchTerm}"`;
            
            items.forEach(p => {
                grid.innerHTML += `
                    <div class="product-card" data-id="${p.id}">
                        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
                        <div class="name">${p.name}</div>
                        <div class="price">₦${p.price.toLocaleString()}</div>
                        <button class="btn-add" onclick="addToCart('${p.id}', '${p.name}', ${p.price}, '${p.image}')">ADD TO CART</button>
                    </div>`;
            });
        }
    });
}

// Ensure the search button works with the new logic
document.getElementById('searchBtn').onclick = () => {
    const term = document.getElementById('searchInput').value;
    loadProducts(term);
};

// Initial Load
loadProducts();
