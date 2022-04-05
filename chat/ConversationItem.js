class ConversationItem {
  id;
  name;
  users;

  container = document.createElement("div");
  conversationName = document.createElement("span");
  numberOfUsers = document.createElement("span");

  constructor(id, name, users) {
    this.id = id;
    this.name = name;
    this.users = users;

    this.conversationName.innerHTML = name;
    this.numberOfUsers.innerHTML = `( ${users.length} )`;

    this.container.appendChild(this.conversationName);
    this.container.appendChild(this.numberOfUsers);
  }

  setOnClick = (listener) => {
    this.container.onclick = () => {
      listener(this.id, this.name, this.users);
    };
  };

  setActiveHighlight = (isHighlight) => {
    if (isHighlight) {
      this.container.style.background = "#ccc";
      this.container.style.color = "#fff";
    } else {
      this.container.style.background = "#fff";
      this.container.style.color = "#000";
    }
  };
}

export { ConversationItem };
