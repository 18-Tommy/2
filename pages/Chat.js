import { Composer } from "../chat/Composer.js";
import { ConversationInfo } from "../chat/ConversationInfo.js";
import { ConversationList } from "../chat/ConversationList.js";
import { MessageList } from "../chat/MessageList.js";
import { UserList } from "../chat/userList.js";

class Chat {
  activeConversation;
  subscribeConversationMessages = null;

  container = document.createElement("div");
  conversationList = new ConversationList();
  conversationInfo = new ConversationInfo();

  composer = new Composer();
  messageList = new MessageList();
  userList = new UserList();

  constructor() {
    this.container.innerHTML = "Chat";

    this.container.appendChild(this.conversationList.container);
    this.container.classList.add("container");
    this.conversationList.setOnConversationItemClick(
      this.setActiveConversation
    );
    this.conversationList.container.classList.add("left-content");

    const divContent = document.createElement("div");
    divContent.classList.add("right-content");
    this.container.appendChild(divContent);
    divContent.appendChild(this.conversationInfo.container);

    const divMainContent = document.createElement("div");
    divContent.appendChild(divMainContent);
    divMainContent.classList.add("right__main-content");

    const divMessages = document.createElement("div");
    divMessages.classList.add("chat-container");
    divMainContent.appendChild(divMessages);
    divMessages.appendChild(this.messageList.container);
    divMessages.appendChild(this.composer.container);

    divMainContent.appendChild(this.userList.container);

    this.subscribeConversation();
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.conversationInfo.setName(conversation.name);
    this.conversationList.setStyleActiveConversation(conversation);

    this.composer.setActiveConversation(conversation);
    this.userList.setActiveConversation(conversation);

    this.messageList.clearMessage();

    this.subscribeConversationMessageList(conversation);
  };

  subscribeConversation = () => {
    db.collection("conversations").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.conversationList.handleCreateConversationAdded(
            change.doc.id,
            change.doc.data().name,
            change.doc.data().users
          );
        }
        if (change.type === "modified") {
          console.log("Modified conversation: ", change.doc.data());
          this.userList.setActiveConversation({
            id: change.doc.id,
            name: change.doc.data().name,
            users: change.doc.data().users,
          });
        }
        if (change.type === "removed") {
          console.log("Removed conversation: ", change.doc.data());
        }
      });
    });
  };

  subscribeConversationMessageList = () => {
    if (this.subscribeConversationMessages !== null) {
      // Disconnect
      this.subscribeConversationMessages();
    }
    // Connect
    this.subscribeConversationMessages = db
      .collection("messages")
      .where("conversationId", "==", this.activeConversation.id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          // console.log(change.doc.data());
          this.messageList.addMessage(change.doc.data());
        });
      });
  };
}

export { Chat };
