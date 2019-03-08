import React, { useState, Fragment, useEffect } from "react";
import { Formik, Field } from "formik";
import s from "./app.component.css";
import * as yup from "yup";

const intialState = {
  name: "",
  email: "",
  password: ""
};
const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
});
function MyComponent(props) {
  const [user, setUser] = useState(intialState);
  return (
    <Fragment>
      <span className={`${s.output}`}>{JSON.stringify(user, null, 2)}</span>
      <Formik
        initialValues={user}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          setUser(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 2000);
        }}
        validationSchema={userSchema}
      >
        {props =>
          !props.isSubmitting ? (
            <form onSubmit={props.handleSubmit} className={s.form}>
              <Field
                type="email"
                placeholder="Enter email"
                onChange={props.handleChange}
                name="email"
                value={props.values.email}
                className={s.text_field}
              />

              {props.errors.email && props.touched.email ? (
                <span className={s.field_text}>{props.errors.email}</span>
              ) : (
                ""
              )}

              <Field
                type="password"
                onChange={props.handleChange}
                name="password"
                value={props.values.password}
                placeholder="Password"
                className={s.text_field}
              />

              {props.errors.password && props.touched.password ? (
                <span className={s.field_text}>{props.errors.password}</span>
              ) : (
                ""
              )}
              <Field
                name="name"
                onChange={props.handleChange}
                value={props.values.name}
                type="text"
                placeholder="Name"
                className={s.text_field}
              />
              {props.errors.name && props.touched.name ? (
                <span className={s.field_text}>{props.errors.name}</span>
              ) : (
                ""
              )}
              <button
                type="submit"
                disabled={!props.dirty && props.isSubmitting}
                className={`${s.button} ${s.submit_button}`}
              >
                Submit
              </button>
              <button
                disabled={!props.dirty}
                onClick={props.handleReset}
                type="button"
                className={s.button}
              >
                Reset
              </button>
            </form>
          ) : (
            <div className={s.overlay} />
          )
        }
      </Formik>
    </Fragment>
  );
}

export default MyComponent;
