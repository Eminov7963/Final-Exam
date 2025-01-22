import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./index.module.scss";
import axios from "axios";
import { Base_Url } from "../../constant/services";
import Rating from "@mui/material/Rating";
const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  image: Yup.string().url().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});

export const Add = () => {
  const [products, setProducts] = useState([]);
  const getAllData = async () => {
    const resp = await axios.get(`${Base_Url}/products`);
    setProducts(resp.data.data);
    console.log(resp.data.data);
  };

  const deleteData = async (id)=>{
    try {
      const deleted = await axios.delete(`${Base_Url}/products/${id}`);
      if (deleted.status === 200) {
        setProducts([...products].filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className={styles.mainAdding}>
      <div className={styles.add}>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            title: "",
            image: "",
            description: "",
            price: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            const pos = { ...values, ratings: 3, oldprice: 0 };
            const posted = await axios.post(`${Base_Url}/products`, pos);
            console.log(posted);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.adding}>
                <label htmlFor="title">Title</label>
                <Field name="title" id="title" />
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="image">image</label>
                <Field
                  name="image"
                  type="url"
                  id="image"
                  className={styles.adding}
                />
                {errors.image && touched.image ? (
                  <div>{errors.image}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="description">description</label>
                <Field
                  name="description"
                  id="description"
                  className={styles.adding}
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="price">price</label>
                <Field
                  name="price"
                  type="number"
                  id="price"
                  className={styles.adding}
                />
                {errors.price && touched.price ? (
                  <div>{errors.price}</div>
                ) : null}
              </div>

              <div className={styles.addParent}>
                <button type="submit" className={styles.submit}>
                  Add
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Oldprice</th>
              <th>Ratings</th>
              <th>Crud</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((q) => {
                return (
                  <tr className={styles.cards} key={q._id}>
                    <td>
                      <img src={q.image} alt="" />
                    </td>
                    <td>{q.title}</td>
                    <td>{q.description}</td>
                    <td>{q.price}</td>
                    <td>{q.oldprice}</td>
                    <td>
                      <Rating
                        name="half-rating"
                        defaultValue={q.ratings}
                        precision={0.5}
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteData(q._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Add;
