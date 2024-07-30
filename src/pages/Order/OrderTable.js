import Common from "../../components/helper/Common";

function OrderTable({orders}) {

  if(orders.length === 0) return <p className="text-danger text-center">Không tìm thấy sản phẩm nào!</p>;
  return (
    <div>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>#</th>
          <th>Mã đơn hàng</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Loại sản phẩm</th>
          <th>Ngày mua</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.id}</td>
              <td>{order.product?.name}</td>
              <td>{Common.formatPrice(order.product?.price)}</td>
              <td>{order.product?.category}</td>
              <td>{Common.formatDateVi(order.date)}</td>
              <td>{order.quantity}</td>
              <td>{Common.formatPrice(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;