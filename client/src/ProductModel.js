
class ProductModel {
  constructor(cardData) {
    this.productName = cardData.name;
    this.price = this.getPrice(cardData);
    this.imageURL = cardData.image;
    this.stockQuantity = 5; // Default value
    this.rarity = cardData.rarity;
    this.hp = parseInt(cardData.hp) || 0;
    this.card_type = cardData.card_type;
    this.set_details = cardData.set_details;
    this.pack = cardData.pack;
  }


  getPrice = (card) => {
    switch (card.rarity) {
      case "◊":
        return 200
      case "◊◊":
        return 500
      case "◊◊◊":
        return 1000
      case "◊◊◊◊":
        return 2000
      case "☆":
        return 3000
      case "☆☆":
        return 5000
      case "☆☆☆":
        return 8000
      case "Crown Rare":
        return 10000
      case "":
        return 100
      default:
        return 800
    }
  }


}

export default ProductModel;