import * as React from "react";
import "../Login/Login.css";
import Form, { FormComponentProps } from "antd/lib/form";
import { ACCOUNT_INFO, TOKEN_KEY, STATIC_ROUTE } from "../../common/Constants";
import ReduxToastr from "react-redux-toastr";
import { Input, Icon, Button } from "antd";
import { toastr } from "react-redux-toastr";

import SignInService from "./SignInService";
import { SIGNIN_ERROR, SIGNIN_SUCCESS } from "../../common/const/message";
import { ERROR, SUCCESS } from "../../common/components/messages";

interface Props {
  history?: any;
}
class SignInComponent extends React.Component<Props & FormComponentProps> {
  constructor(props: Props & FormComponentProps) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange = () => {
    this.props.history.push(STATIC_ROUTE.PATIENT);
  }

  userApi = new SignInService();

  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.userApi.signIn(values).toPromise().then((data: any) => {
        if (data.response && data.response.hasErrors) {
          toastr.error(ERROR, SIGNIN_ERROR);
        } else {
          toastr.success(SUCCESS, SIGNIN_SUCCESS);
          localStorage.setItem(ACCOUNT_INFO, JSON.stringify(data.response.result));
          localStorage.setItem(TOKEN_KEY, JSON.stringify(data.response.result && data.response.result.token));
          this.routeChange();
        }
      });

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="wapper">
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates={true}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <Form onSubmit={this.handleSubmit} className="form-signin">
          <h4>Đăng nhập vào hệ thống</h4>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
                style={{ marginTop: 20 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: 20, width: 200 }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const SignIn = Form.create()(SignInComponent);
export default SignIn;