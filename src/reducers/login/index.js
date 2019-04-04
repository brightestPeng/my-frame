/**
 * 登录页面初始化model
 */

const initState = {
  //登录用户名
  rememberMe: ""
};

const loginModel = (
  state = {
    ...initState
  },
  action
) => {
  switch (action.type) {
    case "save":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default loginModel;
