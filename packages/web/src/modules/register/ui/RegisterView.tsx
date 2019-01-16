import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormikErrors, FormikProps, withFormik } from "formik";
import { validUserSchema } from "@abb/common";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class RegisterViewComponent extends React.PureComponent<
  FormikProps<FormValues> & Props
> {
  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      touched,
      errors
    } = this.props;

    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: "auto " }}>
          <Form.Item
            help={touched.email && errors.email ? errors.email : ""}
            validateStatus={touched.email && errors.email ? "error" : undefined}
          >
            <Input
              name="email"
              prefix={
                <Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />
              }
              placeholder="Username"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            help={touched.password && errors.password ? errors.password : ""}
            validateStatus={
              touched.password && errors.password ? "error" : undefined
            }
          >
            <Input
              name="password"
              prefix={
                <Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />
              }
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            Or <a href="">login now!</a>
          </Form.Item>
        </div>
      </form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
    }
  }
})(RegisterViewComponent);
