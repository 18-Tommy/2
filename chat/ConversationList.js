import { ConversationItem } from "./ConversationItem.js";
import { CreateConversationForm } from "./CreateConversationForm.js";

class ConversationList {
  container = document.createElement("div");
  btnCreateConversation = document.createElement("button");
  createConversationForm = new CreateConversationForm();

  onConversationItemClick;
  conversations = [];

  constructor() {
    this.btnCreateConversation.innerHTML = "+ Create Conversation";
    this.btnCreateConversation.addEventListener(
      "click",
      this.createConversationForm.setVisibility
    );
    this.container.appendChild(this.btnCreateConversation);
    this.container.appendChild(this.createConversationForm.container);
  }

  setOnConversationItemClick = (listener) => {
    this.onConversationItemClick = listener;
  };

  handleCreateConversationAdded = (id, name, users) => {
    const conversation = new ConversationItem(id, name, users);
    conversation.setOnClick((id, name, users) => {
      // get conversation info
      // console.log(id, name, users);

      this.onConversationItemClick({
        id: id,
        name: name,
        users: users,
      });
    });
    this.conversations.push(conversation);
    this.container.appendChild(conversation.container);
  };

  setStyleActiveConversation = (conversation) => {
    this.conversations.forEach((item) => {
      if (item.id === conversation.id) {
        item.setActiveHighlight(true);
      } else {
        item.setActiveHighlight(false);
      }
    });
  };
}

export { ConversationList };
