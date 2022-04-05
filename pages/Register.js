import { InputCommon } from "../common/InputCommon.js";
import { setScreen } from "../index.js";
import { Login } from "./Login.js";

// Check e-mail format
function isEmailValid(email) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  return regex.test(email);
}

// Check name format
function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

function isNameValid(name) {
  let regex = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;
  return regex.test(removeAscent(name));
}

class Register {
  container = document.createElement("div");
  title = document.createElement("h3");

  form = document.createElement("form");

  inputName = new InputCommon("Name: ", "text", "Enter your name", "Name");

  inputEmail = new InputCommon(
    "Email: ",
    "email",
    "Enter your e-mail",
    "Email"
  );

  inputPassword = new InputCommon(
    "Password: ",
    "password",
    "Enter your password",
    "Password"
  );

  inputConfirmPassword = new InputCommon(
    "Confirm Password: ",
    "password",
    "Confirm your password",
    "confirmPassword"
  );

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Register";

    this.container.appendChild(this.form);
    this.form.appendChild(this.title);
    this.form.appendChild(this.inputName.container);
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);
    this.form.appendChild(this.inputConfirmPassword.container);

    this.btnRegister.innerHTML = "Register";
    this.btnRegister.addEventListener("click", this.handleRegister);

    this.btnLogin.innerHTML = "Login";
    this.btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      const loginScreen = new Login();
      setScreen(loginScreen.container);
    });

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }

  handleRegister = (event) => {
    event.preventDefault();

    // Get value
    const name = this.inputName.getValue();
    const email = this.inputEmail.getValue();
    const password = this.inputPassword.getValue();
    const confirmPassword = this.inputConfirmPassword.getValue();

    // Validation
    let isPassed;
    if (
      !name ||
      !isNameValid(name) ||
      !isEmailValid(email) ||
      !email ||
      !password ||
      !confirmPassword ||
      confirmPassword !== password ||
      password.length < 6
    ) {
      isPassed = false;
    } else {
      isPassed = true;
    }
    console.log(isPassed);

    if (!isNameValid(name)) {
      this.inputName.setErrorMessage("Invalid name");
    } else {
      this.inputName.setErrorMessage("");
    }

    if (!isEmailValid(name)) {
      this.inputEmail.setErrorMessage("Invalid e-mail");
    } else {
      this.inputEmail.setErrorMessage("");
    }

    if (!password) {
      this.inputPassword.setErrorMessage("Password can't be empty");
    } else if (password.length < 6) {
      this.inputPassword.setErrorMessage(
        "Passwords must be at least 6 characters."
      );
    } else {
      this.inputPassword.setErrorMessage("");
    }

    if (!confirmPassword) {
      this.inputConfirmPassword.setErrorMessage("Re-Password can't be empty");
    } else if (confirmPassword !== password) {
      this.inputConfirmPassword.setErrorMessage("Password did not match!!!");
    } else {
      this.inputConfirmPassword.setErrorMessage("");
    }

    // Register to Firebase
    if (isPassed) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          alert("Your account has been successfully created.");
          console.log(`User {email} is created`);
          const loginScreen = new Login();
          setScreen(loginScreen.container);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };
}

export { Register, isEmailValid, isNameValid };
