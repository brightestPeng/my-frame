import qs from "querystring";
import request from "./request";

//判断当前环境
const isDEV =
  typeof process !== "undefined" && process.env.NODE_ENV === "production"
    ? false
    : true;

//Api列表
const apiList = {
  security: {
    login: "/login",
    test: "/security/test"
  }
};

//根据不同请求格式化URL
const formatUrl = ({ type = "GET", bool = false, query, url }) => {
  switch (`${type}_${bool}`.toUpperCase()) {
    case "GET_FALSE":
      return `${url}?${qs.stringify(query)}`;
    case "GET_TRUE":
      return `${url}/${query}`;
    default:
      return url;
  }
};

//格式化请求
const formatRequest = val => {
  if (val[0] && apiList[val[0]] && apiList[val[0]][val[1]]) {
    const method = val[2] ? val[2].toUpperCase() : "GET";
    return async (query, extraOptions) => {
      const options = {
        method,
        headers: Object.assign(
          {
            "Content-Type": "application/json;charset=utf-8"
          },
          extraOptions && extraOptions.headers
        )
      };

      if (method === "POST") {
        options.body = JSON.stringify(query);
      }

      const url = `${isDEV ? "/proxy" : ""}${formatUrl({
        type: method,
        bool: val[3] ? true : false,
        query,
        url: apiList[val[0]][val[1]]
      })}`;

      return request(url, options);
    };
  } else {
    throw new Error(
      `${val[0]}中不存在${val[1]}配置项,请检查config.service.js配置!`
    );
  }
};

export default formatRequest;
