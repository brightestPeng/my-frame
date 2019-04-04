/**
 * 此目录用于存放容器组件
 */
import React, { Component } from "react";
import { Button, Input, Form, Icon, Checkbox } from "antd";

//引入方法
import { connect } from "react-redux";
import { getLocalStorage, setLocalStorage } from "utils/method.js";

//引入参数
import { actionTypes } from "utils/constant";

//引入less文件
import "./index.less";

class index extends Component {

  handleSubmit = e => {
		e.preventDefault();
    const { form, loginIn } = this.props;
    const { setFields } = form;
    form.validateFields((err, values) => {
      if (!err) {
        setLocalStorage({ ...values });

        //登录发生错误调用回调函数
        loginIn(values, errors => {
					setFields(errors);
        });
      }
    });
  };

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form className="login-form"  onSubmit={this.handleSubmit} >
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入你的用户名!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入你的密码!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              autoComplete="true"
            />
          )}
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: getLocalStorage("remember") ? true : false
          })(<Checkbox>记住密码</Checkbox>)}
        </Form.Item>
        <Button
          className="login-btn"
          htmlType="submit"
          type="primary"
          loading={loading}
        >
          登录
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.systemModel.loading,
    errors: state.systemModel.errors
  };
};

const mapDispatchToProps = dispatch => ({
  loginIn: (formData, callback) =>
    dispatch({
      type: actionTypes.LoginIn,
      payload: {
        ...formData
      },
      callback
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(index));
