document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const productModal = document.getElementById("product-modal");
    const closeModalButton = document.getElementById("close-modal");
    const modalForm = document.getElementById("modal-form");
    const modalProductId = document.getElementById("modal-product-id");
    const modalName = document.getElementById("modal-name");
    const modalPrice = document.getElementById("modal-price");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const modalCategory = document.getElementById("modal-category");
    const modalSubmitButton = document.getElementById("modal-submit-button");
    const addProductButton = document.getElementById("add-product-button");

    const API_URL = "https://67d02b68825945773eafcd74.mockapi.io/hoiandiscovery/users";

    async function getProducts() {
        try {
            addProductButton.disabled = true; 
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch products");
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
            return [];
        } finally {
            addProductButton.disabled = false;
        }
    }

    async function saveProduct(product, id = null) {
        try {
            modalSubmitButton.disabled = true;
            const method = id ? "PUT" : "POST";
            const url = id ? `${API_URL}/${id}` : API_URL;
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error("Failed to save product");
            return await response.json();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Không thể lưu sản phẩm. Vui lòng thử lại sau.");
        } finally {
            modalSubmitButton.disabled = false;
        }
    }

    async function deleteProductFromAPI(id) {
        try {
            const deleteButton = document.querySelector(`button.delete[onclick="deleteProduct(${id})"]`);
            if (deleteButton) deleteButton.disabled = true;
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete product");
            renderProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Không thể xóa sản phẩm. Vui lòng thử lại sau.");
        } finally {
            const deleteButton = document.querySelector(`button.delete[onclick="deleteProduct(${id})"]`);
            if (deleteButton) deleteButton.disabled = false;
        }
    }

    window.deleteProduct = async (id) => {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            await deleteProductFromAPI(id);
        }
    };

    function openModal(title, isEditable, buttonText = "Lưu") {
        document.getElementById("modal-title").textContent = title;
        modalName.disabled = !isEditable;
        modalPrice.disabled = !isEditable;
        modalImage.disabled = !isEditable;
        modalDescription.disabled = !isEditable;
        modalCategory.disabled = !isEditable;
        modalSubmitButton.style.display = isEditable ? "block" : "none";
        modalSubmitButton.textContent = buttonText;
        productModal.style.display = "block";
    }

    function closeModal() {
        productModal.style.display = "none";
        modalForm.reset();
        modalProductId.value = "";
    }

    closeModalButton.addEventListener("click", closeModal);

    addProductButton.addEventListener("click", () => {
        modalForm.reset();
        modalProductId.value = "";
        openModal("Thêm Sản Phẩm", true, "Thêm");
    });

    window.viewProduct = async (id) => {
        try {
            const viewButton = document.querySelector(`button.view[onclick="viewProduct(${id})"]`);
            if (viewButton) viewButton.disabled = true;
            const products = await getProducts();
            const product = products.find(p => p.id == id);
            if (!product) {
                alert("Không thể xem sản phẩm. Sản phẩm không tồn tại.");
                return;
            }
            modalProductId.value = id;
            modalName.value = product.name || "";
            modalPrice.value = product.price || "";
            modalImage.value = product.image || "";
            modalDescription.value = product.description || "";
            modalCategory.value = product.category || "Pizza";
            openModal("Chi Tiết Sản Phẩm", false);
        } catch (error) {
            console.error(error);
            alert("Không thể xem sản phẩm. Vui lòng thử lại sau.");
        } finally {
            const viewButton = document.querySelector(`button.view[onclick="viewProduct(${id})"]`);
            if (viewButton) viewButton.disabled = false;
        }
    };

    window.editProduct = async (id) => {
        try {
            const editButton = document.querySelector(`button.edit[onclick="editProduct(${id})"]`);
            if (editButton) editButton.disabled = true; 
            const products = await getProducts();
            const product = products.find(p => p.id == id);
            if (!product) {
                alert("Không thể chỉnh sửa sản phẩm. Sản phẩm không tồn tại.");
                return;
            }
            modalProductId.value = id;
            modalName.value = product.name || "";
            modalPrice.value = product.price || "";
            modalImage.value = product.image || "";
            modalDescription.value = product.description || "";
            modalCategory.value = product.category || "Pizza";
            openModal("Cập Nhật Sản Phẩm", true, "Lưu");
        } catch (error) {
            console.error(error);
            alert("Không thể chỉnh sửa sản phẩm. Vui lòng thử lại sau.");
        } finally {
            const editButton = document.querySelector(`button.edit[onclick="editProduct(${id})"]`);
            if (editButton) editButton.disabled = false;
        }
    };

    modalForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const id = modalProductId.value;
            const product = {
                name: modalName.value,
                price: modalPrice.value,
                image: modalImage.value,
                description: modalDescription.value,
                category: modalCategory.value,
            };
            await saveProduct(product, id);
            renderProducts();
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Không thể cập nhật sản phẩm. Vui lòng thử lại sau.");
        }
    });

    async function renderProducts() {
        try {
            const products = await getProducts();
            if (products.length === 0) {
                productList.innerHTML = `<tr><td colspan="7">Không có sản phẩm nào.</td></tr>`;
                return;
            }
            productList.innerHTML = products.map((p, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${p.name}</td>
                    <td>${p.price}</td>
                    <td><img src="${p.image}" alt="${p.name}" style="width: 50px; height: auto;"></td>
                    <td>${p.description || ''}</td>
                    <td>${p.category || 'Không có danh mục'}</td>
                    <td>
                        <button class="view" onclick="viewProduct(${p.id})">Xem</button>
                        <button class="edit" onclick="editProduct(${p.id})">Sửa</button>
                        <button class="delete" onclick="deleteProduct(${p.id})">Xóa</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error("Error rendering products:", error);
            alert("Không thể hiển thị danh sách sản phẩm. Vui lòng thử lại sau.");
        }
    }

    document.addEventListener("keydown", (e) => {
        if (productModal.style.display === "block") {
            if (e.key === "Enter") {
                e.preventDefault();
                if (!modalSubmitButton.disabled) {
                    modalForm.requestSubmit(); 
                }
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeModal();
            }
        }
    });

    renderProducts();
});