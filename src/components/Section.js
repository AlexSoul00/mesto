class Section {
  constructor ({items, renderer}, selector){
    this._renderer = renderer;
    this._selector = selector
    this._container = document.querySelector(this._selector);
    this._items = items;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }
}

export {Section};
