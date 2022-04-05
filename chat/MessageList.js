import { MessageItem } from "./MessageItem.js";

class MessageList {
  container = document.createElement("div");

  constructor() {}

  addMessage = (message) => {
    console.log(message);
    const messageItem = new MessageItem(message.content, message.sender);
    this.container.appendChild(messageItem.container);
  };

  clearMessage = () => {
    this.container.innerHTML = "";
  };
}

export { MessageList };
