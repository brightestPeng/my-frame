import "whatwg-fetch";
import { message } from "antd";
import { unNeedMsg } from "./config.system.js";

const isDev =
  typeof process !== "undefined" && process.env.NODE_ENV === "production"
    ? false
    : true;

const parseResponse = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`请求异常！`);
  }
};

export default function request(url, options) {
  return fetch(url, options)
    .then(parseResponse)
    .then(data => {
      const { code, message } = data;
      if (code === "200") {
        message.success(message);
        return data;
      } else {
        if (!unNeedMsg.includes(isDev ? url.replace(/\/proxy/, "") : url)) {
          throw new Error(message);
        }else{
					return data;
				}
      }
    })
    .catch(err => {
      message.error(err.message);
      return { code: "-1", message: "error", data: null };
    });
}
