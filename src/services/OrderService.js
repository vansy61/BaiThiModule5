import axios from "axios";
import Common from "../components/helper/Common";

class OrderService {
  static fetchOrders() {
    return axios.get("http://localhost:3000/orders?_embed=product")
      .then(response => response.data)
      .catch(error => {
        alert(error)
      });
  }
  static createOrder(order) {
    return axios.post("http://localhost:3000/orders", order)
      .then(async () => {
        await Common.delay(1000);
        Common.toastSuccess('Tạo mới thành công <3!');
      })
      .catch(error => {
        alert(error)
      });
  }
}

export default OrderService;