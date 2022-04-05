import { InputCommon } from "../common/InputCommon.js";
import { Modal } from "../common/Modal.js";

class CreateConversationForm {
  visibility = true;

  container = document.createElement("div");

  modal = new Modal();

  form = document.createElement("form");
  // First: current user
  conversationNameInput = new InputCommon(
    "Conversation Name",
    "text",
    "Enter your conversation name: ",
    "conversationName"
  );

  constructor() {
    this.container.appendChild(this.modal.container);
    this.container.style.visibility = "hidden";

    this.modal.setHeader("Create conversation");
    this.modal.setBody(this.form);
    this.modal.setOnclickCancel(this.setVisibility);
    this.modal.setOnclickCreate(this.handleCreateConversations);

    this.form.appendChild(this.conversationNameInput.container);
  }

  setVisibility = () => {
    if (this.visibility) {
      this.container.style.visibility = "visible";
      this.visibility = false;
    } else {
      this.container.style.visibility = "hidden";
      this.visibility = true;
    }
  };

  handleCreateConversations = () => {
    const name = this.conversationNameInput.getValue();
    db.collection("conversations").add({
      name: name,
      users: [firebase.auth().currentUser.email],
    });
    this.conversationNameInput.clearInput();
  };
}

export { CreateConversationForm };
