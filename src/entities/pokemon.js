export default class Pokemon {
  /**
   * @param {String} name
   * @param {Number} id
   * @param {Number} weight
   * @param {Number} height
   * @param {Array<String>} types
   */
  constructor(imageURL, name, id, weight, height, types) {
    this.imageURL = imageURL;
    this.name = name;
    this.id = id;
    this.weight = weight;
    this.height = height;
    this.types = types;
  }
}
