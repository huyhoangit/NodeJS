document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://67d02b68825945773eafcd74.mockapi.io/hoiandiscovery/users";
    const productId = new URLSearchParams(window.location.search).get("id");

    if (!productId) {
        alert("Không tìm thấy sản phẩm.");
        window.location.href = "home.htm";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) throw new Error("Không thể tải chi tiết sản phẩm.");
        const product = await response.json();

        document.getElementById("product-image").src = product.image || "placeholder.jpg";
        document.getElementById("product-name").textContent = product.name || "Không có tên sản phẩm";
        document.getElementById("product-price").textContent = `Giá: ${product.price.toLocaleString()} VND`;
        document.getElementById("product-description").textContent = product.description || "Không có mô tả.";
        document.getElementById("product-category").textContent = `Danh mục: ${product.category || "Không có danh mục"}`;
    } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.");
        window.location.href = "home.htm"; 
    }

    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = "home.htm";
    });
});
