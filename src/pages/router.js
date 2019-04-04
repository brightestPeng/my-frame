/**
 * 所有页面路由由此处进行汇总，交由总路由进行集中处理
 */
//引入数据集成页面路由
import gatherRoutes from "./gather/router";
//引入元数据路由
import metadataRoutes from "./metadata/router";

 //独立路由
export default [
	{
		path:"/home",
		name:"主页",
		component:"homepage/index.js",
		icon:"home"
	},
	{
		path:"/login",
		name:"登录页",
		component:"login/index.js",
		icon:"login"
	},
	...gatherRoutes,
	...metadataRoutes
]


