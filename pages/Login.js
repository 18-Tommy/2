import { InputCommon } from "../common/InputCommon.js";
import { setScreen } from "../index.js";
import { Register } from "./Register.js";
import { Chat } from "./Chat.js";

class Login {
  container = document.createElement("div");
  title = document.createElement("h3");

  form = document.createElement("form");

  inputEmail = new InputCommon(
    "Email: ",
    "email",
    "Enter your e-mail",
    "E-mail"
  );

  inputPassword = new InputCommon(
    "Password: ",
    "password",
    "Enter your password",
    "Password"
  );

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Login";

    this.container.appendChild(this.form);
    this.form.appendChild(this.title);
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);

    this.btnLogin.innerHTML = "Login";
    this.btnLogin.classList = "btn-login"
    this.btnLogin.addEventListener("click", this.handleLogin);

    this.btnRegister.innerHTML = "Register";
    this.btnRegister.addEventListener("click", this.handleRedirectRegister);

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }

  handleRedirectRegister = (event) => {
    event.preventDefault();
    const registerScreen = new Register();
    setScreen(registerScreen.container);
  };

  handleLogin = (event) => {
    event.preventDefault();
    // Get value
    const email = this.inputEmail.getValue();
    const password = this.inputPassword.getValue();

    // Validation
    let isPassed;
    if (!email || !password) {
      isPassed = false;
    } else {
      isPassed = true;
    }
    console.log(isPassed);

    if (!email) {
      this.inputEmail.setErrorMessage("E-mail can't be empty");
    } else {
      this.inputEmail.setErrorMessage("");
    }

    if (!password) {
      this.inputPassword.setErrorMessage("Password can't be empty");
    } else {
      this.inputPassword.setErrorMessage("");
    }

    // Login
    if (isPassed) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          alert("Successfully login");
          const chatScreen = new Chat();
          setScreen(chatScreen.container);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };
}

export { Login };
