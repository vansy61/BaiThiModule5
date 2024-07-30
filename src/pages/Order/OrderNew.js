import {useFormik} from "formik";
import {useEffect, useState} from "react";
import OrderForm from "../../components/Order/OrderForm";
import Loading from "../../components/Loading";
import ProductService from "../../services/ProductService";
import Common from "../../components/helper/Common";
import OrderService from "../../services/OrderService";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";


const validationSchema = Yup.object({
  quantity: Yup.number()
    .min(1, "Số lượng phải lớn hơn 1"),
  productId: Yup.number()
    .required('Vui lòng chọn sản phẩm!')
    .integer('Vui lòng chọn sản phẩm!'),
  date: Yup.date()
   .max(new Date(), "Ngày mua phải nhỏ hơn ngày hiện tại")
   .required("Vui lòng chọn ngày mua!")
});

export default function OrderNew() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      quantity: 1,
      //date format 'dd/MM/yyyy'
      date: Common.formatDate(new Date()),
      productId: ''
    },
    validationSchema,
    onSubmit: async values => {
      setProducts(null);
      let product = await ProductService.findProductById(values.productId);
      values.total = product.price * values.quantity;
      console.log(values);
      await OrderService.createOrder(values);
      navigate('/');
    },
    validateOnMount: false
  });

  useEffect(() => {
    (async function () {
      // delay cho đẹp <3
      await Common.delay(1000);
      setProducts(await ProductService.fetchProducts());
    })();
  }, []);

  console.log(formik.values);

  return (
    <div className="rounded shadow-sm bg-white mb-2 p-4 w-50 mx-auto">
      {
        products === null ? <Loading /> : <OrderForm formik={formik} products={products}/>
      }
    </div>
  );
}