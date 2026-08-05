export class ProductsPageLocators {
  static readonly productCard = '.inventory_item';
  static readonly productName = '.inventory_item_name';
  static readonly productDescription = '.inventory_item_desc';
  static readonly productPrice = '.inventory_item_price';
  static readonly cartLink = 'a.shopping_cart_link';
  static productAddButton(productId: string) {
    return `button[data-test="add-to-cart-${productId}"]`;
  }
}
