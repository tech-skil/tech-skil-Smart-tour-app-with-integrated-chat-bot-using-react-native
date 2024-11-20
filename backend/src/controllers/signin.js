const authService = require("../service/signin");

async function signin(req, res) {
  try {
//<<<<<<< master
    const { email, password } = req.body; // Changed `passward` to `password`
//=======
    //const { email, password } = req.body;  // Changed `passward` to `password`
//>>>>>>> main
    const token = await authService.signin(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

module.exports = { signin };
