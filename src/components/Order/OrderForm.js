import {Link} from "react-router-dom";
import Common from "../helper/Common";

function OrderForm({formik, products}) {
  const productOptions = products.map(product => {
    return (
      <option key={product.id} value={product.id}>
        {product.name}
      </option>
    );
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label>Sản phẩm</label>
        <select
          name="productId"
          id="productId"
          onChange={formik.handleChange}
          value={formik.values.productId}
          className="form-select"
        >
          <option value="">Chọn một sản phẩm</option>
          {productOptions}
        </select>
        {formik.touched.productId && formik.errors.productId ?
          <div className="text-danger">{formik.errors.productId}</div> : null}
      </div>
      <div className="mb-3">
        <label>Số lượng</label>
        <input
          className="form-control"
          id="quantity"
          name="quantity"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.quantity}
        />
        {formik.touched.quantity && formik.errors.quantity ? <div className="text-danger">{formik.errors.quantity}</div> : null}
      </div>
      <div className="mb-3">
        <label>Ngày mua</label>
        <input
          className="form-control"
          id="date"
          name="date"
          type="date"
          max={Common.formatDate(new Date())}
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        {formik.touched.date && formik.errors.date ?
          <div className="text-danger">{formik.errors.date}</div> : null}
      </div>

      <div className="text-end">
        <Link to={"/"} className="btn btn-secondary">Quay lại</Link>
        <button type="submit" className="btn btn-success mx-2 px-4">Tạo mới</button>

      </div>
    </form>

  )
}

export default OrderForm;