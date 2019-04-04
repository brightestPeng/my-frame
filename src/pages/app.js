/**
 * app 逻辑处理层
 */
import React, { Fragment } from "react";

//引入工具方法
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Default } from "components/layout/index.js";
import config from "utils/config.system.js";
import { actionTypes } from "utils/constant";
import { Modal } from "antd";
import { routerActions } from "connected-react-router";
import Loading from "components/loading";
import nProgress from "nprogress";
import routes from "./router";

import "./app.less";

const confirm = Modal.confirm;
const { openPages } = config;

let lastHref;

class index extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    const { pathname } = location;

    //进入页面时进行登录
    if (pathname !== "/login") {
      dispatch({
        type: actionTypes.autoLogin,
        callback: () => {
          confirm({
            title: "请重新登录!",
            content: "用户还未登录",
            okText: "登录",
            okType: "primary",
            cancelText: "取消",
            onOk: () => {
              dispatch(routerActions.push("/login"));
            }
          });
        }
      });
    }
  }

  render() {
    const { pageLoading } = this.props;
		const { pathname } = this.props.location;



    // const { href } = window.location;
    // if (lastHref !== href) {
		// 	nProgress.start();
    //   if (!pageLoading) {
    //     nProgress.done();
		// 		lastHref = href;
    //   }
    // }

    //对于配置过的网页,开放布局权限
    if (
      openPages &&
      openPages instanceof Array &&
      openPages.includes(pathname)
    ) {
      return pageLoading ? <Loading loading={pageLoading} /> : (
        <Fragment>{this.props.children}</Fragment>
      );
    }

    return (
      <div className="layout-app">
        <Default.Header />
        <div className="layout-content">
          <Default.Slider  />
          {pageLoading ? (
            <Loading loading={pageLoading} />
          ) : (
            <div>{this.props.children}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemList: state.systemModel.systemList,
    menuList: state.systemModel.menuList,
    login: state.systemModel.login,
    pageLoading: state.systemModel.pageLoading
  };
};

export default withRouter(connect(mapStateToProps)(index));
