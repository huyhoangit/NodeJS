const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb+srv://hehehe:huyhoang1@cluster0.f0zyj.mongodb.net/Test_Hoang_Hien", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch(err => console.log("Lỗi kết nối MongoDB:", err.message));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("Hoangdeptrai", UserSchema, "Hoangdeptrai");

app.get("/user", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(` Server chạy tại http://localhost:${PORT}`);
});
