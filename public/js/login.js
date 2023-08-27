const loginSlideBtn = document.getElementById("loginSlide");
const signupSlideBtn = document.getElementById("signUpSlide");
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");

loginSlideBtn.addEventListener("click", () => {
  loginBox.classList.add("active");
  signupBox.classList.remove("active");
  document.title = "RichPanel || Login";
});

signupSlideBtn.addEventListener("click", () => {
  signupBox.classList.add("active");
  loginBox.classList.remove("active");
  document.title = "RichPanel || SignUp";
});

document.getElementById("signInBtn").addEventListener("click", function (event) {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  console.log(loginEmail)
  axios.post("/login", { loginEmail, loginPassword })
  .then((response) => {
    window.location.href = "/dashboard";
  })
  .catch((error) => {
    console.error("Login failed", error);
  });
});

document.getElementById("signUpBtn").addEventListener("click", function (event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios.post("/register", { name, email, password })
  .then((response) => {
    window.location.href = "/login";
  })
  .catch((error) => {
    console.error("Registration failed", error);
  });
});
