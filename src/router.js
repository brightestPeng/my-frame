//引入组件
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Loading from "components/loading/";
import App from "pages/app";
import Errors from "pages/errors/404";
import { ConnectedRouter } from "connected-react-router";

//引入工具方法
import loadable from "@loadable/component";
import routes from "pages/router";

//按需加载页面组件
const getLazyLoadComponent = component => {
  return loadable(() => import(`pages/${component}`), {
    callback: Loading
  });
};

/**
 * 合并路由，并返回对应的参数
 * @param {String} pathname
 * @param {Array} dependentRoutes
 * @param {Array} independentRoutes
 */
// const mergeRoutes = (pathname,dependentRoutes,independentRoutes)=>{
// 	if(pathname !== "/"){
// 		console.log(pathname);
// 	}

// 	return { type:"home",routes:[] }
// }

const routerConfig = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          {routes.map(item => {
            if (typeof item.component !== "undefined") {
              return (
                <Route
                  exact
                  path={item.path}
                  key={item.path}
                  component={getLazyLoadComponent(item.component)}
                />
              );
            }
          })}
          {/* 集中处理404页面 */}
          <Route path="/errors404" component={Errors} />
          <Route exact component={() => <Redirect to="/errors404" />} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};

export default routerConfig;
