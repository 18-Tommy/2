class ConversationInfo {
  name;

  container = document.createElement("div");
  conversationName = document.createElement("span");
  btnLogout = document.createElement("button");

  constructor() {
    this.conversationName.innerHTML = "Please choose 1";
    this.btnLogout.innerHTML = "Logout";
    this.btnLogout.addEventListener("click", this.handleLogout);

    this.container.appendChild(this.conversationName);
    this.container.appendChild(this.btnLogout);
  }

  setName = (name) => {
    this.name = name;
    this.conversationName.innerHTML = name;
  };

  handleLogout = (event) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Successfully log out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export { ConversationInfo };
