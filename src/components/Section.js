class Section {
  constructor ({items, renderer}, selector){
    this._items = items;
    this._renderer = renderer;
    this._selector = selector
    this._container = document.querySelector(this._selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }
}

export {Section};
