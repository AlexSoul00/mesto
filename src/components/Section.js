class Section {
  constructor ({renderer}, selector){
    this._renderer = renderer;
    this._selector = selector
    this._container = document.querySelector(this._selector);
  }

  setItimes(items){
    this._items = items;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }
}

export {Section};
