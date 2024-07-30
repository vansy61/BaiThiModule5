import {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import OrderService from "../../services/OrderService";
import {Link} from "react-router-dom";
import OrderTable from "./OrderTable";
import ProductService from "../../services/ProductService";

export default function OrderIndex() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(null);
  const [searchProductId, setSearchProductId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [topProducts, setTopProducts] = useState("");

  useEffect(() => {
    OrderService.fetchOrders()
     .then(data => setOrders(data));
    ProductService.fetchProducts()
      .then(data => setProducts(data));
  }, [])


  let filteredOrders = orders ? orders.filter(order => {
    const dateStartMatch = startDate ? new Date(startDate) <= new Date(order.date) && new Date(order) : true;
    const dateEndMatch = endDate ? new Date(endDate) >= new Date(order.date) && new Date(order) : true;
    const productMatch = searchProductId ? order.productId === searchProductId : true;
    return productMatch && dateStartMatch && dateEndMatch;
  }) : [];
  if(products && topProducts && topProducts !== "") {
    filteredOrders = filteredOrders.sort((a, b) => b.total - a.total).slice(0, parseInt(topProducts));
  }

  console.log(filteredOrders)

  const sortedOrders = filteredOrders.sort((a, b) => a.product.price - b.product.price)

  return (
    <div>
      <div className="rounded shadow-sm bg-white mb-4 p-2 d-flex align-items-center justify-content-between">
        <h3>Danh sách đơn hàng</h3>
        <Link to={'/orders/new'} className="btn btn-primary">Thêm mới</Link>
      </div>
      <div className="rounded shadow-sm bg-white mb-2 p-2">
        <div className="mb-3" id="search">
          <div className="row mb-2">
            <div className="col-3">
              <input
                type="date"
                placeholder="Tìm theo tiêu đề"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control mb-2"
              />
            </div>
            <div className="col-3">
              <input
                type="date"
                placeholder="Tìm theo tóm tắt"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control mb-2"
              />
            </div>
            <div className="col-3">
              <select
                value={searchProductId}
                onChange={(e) => setSearchProductId(e.target.value)}
                className="form-select mb-2"
              >
                <option value="">Chọn sản phẩm</option>
                {products && products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <select
                value={topProducts}
                onChange={(e) => setTopProducts(e.target.value)}
                className="form-select mb-2"
              >
                <option value="">Top sản phẩm bán chạy</option>
                <option value="1">Top 1 bán chạy</option>
                <option value="5">Top 5 bán chạy</option>
                <option value="10">Top 10 bán chạy</option>
              </select>
            </div>
          </div>
        </div>
        {
          orders === null ? <Loading/> : <OrderTable orders={sortedOrders}/>
        }
      </div>
    </div>
  )
}
