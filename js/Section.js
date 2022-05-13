class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach(element => this.renderer(element));
  }

  addItem(item) {
    this._container.append(item);
  }
}