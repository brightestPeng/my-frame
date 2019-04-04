/**
 * 系统model
 */

const initState = {
	//是否登录成功
	loading:false,
	//用户是否登录
	login: false,	
	//系统权限
	systemList:[],
	//菜单权限
	menuList:[],
	//错误信息
	errors:{},
	//页面加载
	pageLoading:false
};

const systemModel = (state = {...initState}, action) => {
  switch (action.type) {
		case "systemModel/login":
      return {
        ...action.payload,
        login: true
			};
		case "systemModel/save":
			return {
				...state,
				...action.payload
			}
		default :
			return state;
  }
};

export default systemModel;
