document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const API_URL = "https://example.com/api/users"; 

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!username || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Đăng ký thất bại. Vui lòng thử lại.");

            alert("Đăng ký thành công. Vui lòng đăng nhập.");
            window.location.href = "login.htm"; 
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Đăng ký thất bại. Vui lòng thử lại.");
        }
    });
});
