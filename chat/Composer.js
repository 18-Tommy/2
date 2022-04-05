class Composer {
  activeConversation;

  container = document.createElement("div");
  form = document.createElement("form");
  input = document.createElement("input");
  btnEmoji = document.createElement("button");

  constructor() {
    this.input.type = "text";
    this.input.placeholder = "Type a message ...";
    this.btnEmoji.innerHTML = "💕";

    this.container.appendChild(this.form);
    this.form.appendChild(this.input);
    this.form.appendChild(this.btnEmoji);

    // Catching event press Enter
    this.form.addEventListener("keypress", this.handleSendMessage);
    this.btnEmoji.addEventListener("click", this.handleSendEmoji);
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
  };

  handleSendMessage = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      // Check authentication
      /**
       * User is login
       * Active conversation not equal null
       */
      if (
        !firebase.auth().currentUser.email ||
        !this.activeConversation ||
        !this.input.value
      ) {
        alert("Please choose your conversation!");
        return;
      } else {
        // Send message
        db.collection("messages").add({
          content: this.input.value,
          sender: firebase.auth().currentUser.email,
          conversationId: this.activeConversation.id,
        });

        this.input.value = "";
      }
    }
  };

  handleSendEmoji = (event) => {
    event.preventDefault();
    if (!firebase.auth().currentUser.email || !this.activeConversation) {
      alert("Please choose your conversation!!!");
      return;
    } else {
      db.collection("messages").add({
        content: this.btnEmoji.innerHTML,
        sender: firebase.auth().currentUser.email,
        conversationId: this.activeConversation.id,
      });
    }
  };
}

export { Composer };
