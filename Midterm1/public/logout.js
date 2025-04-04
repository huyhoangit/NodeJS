document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                alert("Bạn đã đăng xuất thành công.");
                window.location.href = "login.htm";
            }
        });
    }
});
