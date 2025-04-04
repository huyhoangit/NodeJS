document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://67d02b68825945773eafcd74.mockapi.io/hoiandiscovery/users";
    const menuContainer = document.getElementById("menu-container");
    const categoryButtons = document.querySelectorAll(".category-button");
    const wishlist = new Set(); // Store wishlist items

    async function fetchMenuItems() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch menu items");
            const items = await res.json();
            renderMenuItems(items, "Pizza");
        } catch (error) {
            console.error("Error fetching menu items:", error);
            alert("Không thể tải danh sách menu. Vui lòng thử lại sau.");
        }
    }

    function truncateDescription(description, maxLength = 50) {
        return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
    }

    function renderMenuItems(items, category) {
        const filteredItems = items.filter(item => item.category === category);
        if (filteredItems.length === 0) {
            menuContainer.innerHTML = `<p>Không có món ăn nào trong danh mục "${category}".</p>`;
            return;
        }
        menuContainer.innerHTML = filteredItems.map(item => `
            <div class="menu-card" onclick="viewProductDetail('${item.id}')">
                <button class="wishlist ${wishlist.has(item.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${item.id}')">
                    <i class="fas fa-heart"></i> <!-- Font Awesome heart icon -->
                </button>
                <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${truncateDescription(item.description || 'Không có mô tả.')}</p>
                <p class="price">Giá chỉ từ: ${item.price.toLocaleString()} VND</p>
                <div class="actions">
                    <button onclick="event.stopPropagation(); addToCart('${item.id}')">Thêm</button>
                </div>
            </div>
        `).join('');
    }

    window.viewProductDetail = (id) => {
        window.location.href = `product-detail.htm?id=${id}`; // Redirect to product detail page
    };

    categoryButtons.forEach(button => {
        button.addEventListener("click", async () => {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const category = button.textContent.trim();
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("Failed to fetch menu items");
                const items = await res.json();
                renderMenuItems(items, category);
            } catch (error) {
                console.error("Error fetching menu items for category:", error);
                alert("Không thể tải danh sách menu. Vui lòng thử lại sau.");
            }
        });
    });

    window.addToCart = (id) => {
        alert(`Món ăn với ID ${id} đã được thêm vào giỏ hàng.`);
    };

    window.toggleWishlist = (id) => {
        if (wishlist.has(id)) {
            wishlist.delete(id);
        } else {
            wishlist.add(id);
        }
        fetchMenuItems();
    };

    fetchMenuItems();
});