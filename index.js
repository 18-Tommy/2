import { Login } from "./pages/Login.js";
import { Chat } from "./pages/Chat.js";

const app = document.querySelector("#app");

const setScreen = (screen) => {
  app.innerHTML = "";
  app.appendChild(screen);
};

// Check if user is sign in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;

    const chatScreen = new Chat();
    setScreen(chatScreen.container);
  } else {
    // User is signed out
    // Set default screen
    const loginScreen = new Login();
    setScreen(loginScreen.container);
  }
});

export { setScreen };
