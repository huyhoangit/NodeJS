document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const API_URL = "https://67d02b68825945773eafcd74.mockapi.io/hoiandiscovery/products";

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}?username=${username}&password=${password}`);
            if (!response.ok) throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");

            const users = await response.json();
            console.log("Dữ liệu trả về từ API:", users);

            const user = users.find(u => u.username === username && u.password === password);

            if (!user) {
                alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.");
                return;
            }

            console.log("Dữ liệu người dùng:", user);

            if (user.role === "admin") {
                alert("Đăng nhập thành công với vai trò: Quản trị viên");
                window.location.href = "./index.htm";
            } else if (user.role === "user") {
                alert("Đăng nhập thành công với vai trò: Người dùng");
                window.location.href = "./home.htm";
            } else {
                alert("Vai trò không hợp lệ: " + user.role);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Đăng nhập thất bại. Vui lòng thử lại.");
        }
    });
});
