export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }

}
