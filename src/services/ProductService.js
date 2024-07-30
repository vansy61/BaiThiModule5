import axios from "axios";

class ProductService {
  static fetchProducts() {
    return axios.get("http://localhost:3000/products")
      .then(response => response.data)
      .catch(error => {
        alert(error)
      });
  }

  static findProductById(productId) {
    return axios.get(`http://localhost:3000/products/${productId}`)
     .then(response => response.data)
     .catch(error => {
        alert(error)
      });
  }

}

export default ProductService;