export default class Product {
  static PROPERTIES = [
    'imageUrl',
    'name',
    'count',
    'height',
    'width',
    'weight'
  ];

  constructor(product) {
    Product.PROPERTIES.forEach(prop => {
      this[prop] = product[prop];
    });
    this.id = Date.now();
  }
}
