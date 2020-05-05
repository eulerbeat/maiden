import React from 'react';
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { TextField, Button, FormControl } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../service/auth.service";
import PropTypes from 'prop-types';
import './Login.css';


function Login(props) {
  return (
    <>
      <Formik
        initialValues={{
          email: "dev@test.com",
          password: "devpass1"
        }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = "Email is required.";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          setTimeout(() => {
            login(values.email, values.password)
              .then(({ data }) => {
                props.login(data.access, data.refresh);
              })
              .catch(() => {
                setSubmitting(false);
                setStatus("Invalid login credentials.");
              });
          }, 1000);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
            <form
              noValidate={true}
              autoComplete="off"
              className="login-form"
              onSubmit={handleSubmit}
            >
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              <div className="form-group">
                <TextField
                  type="email"
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                />
              </div>

              <div className="form-group">
                <TextField
                  type="password"
                  margin="normal"
                  label="Password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                />
              </div>

              <FormControl>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
              </FormControl>
            </form>
          )}
      </Formik>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func
};

export default withRouter(
  connect(
    null,
    auth.actions
  )(Login)
);
