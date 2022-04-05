class InputCommon {
  container = document.createElement("div");
  label = document.createElement("label");
  input = document.createElement("input");
  errorMessage = document.createElement("div");

  constructor(label, inputType, placeholder, name) {
    this.label.innerHTML = label;
    this.label.htmlFor = name;
    this.input.type = inputType;
    this.input.placeholder = placeholder;

    this.container.appendChild(this.label);
    this.container.appendChild(this.input);
    this.container.appendChild(this.errorMessage);
  }

  getValue = () => {
    return this.input.value;
  };

  clearInput = () => {
    this.input.value = "";
  };

  setErrorMessage = (errorMess) => {
    this.errorMessage.innerHTML = errorMess;
  };
}

export { InputCommon };
