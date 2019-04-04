/**
 * 此为数据集成目录下的路由配置文件
 */
const system = "metadata";


export default [
  {
    path: "/metadata/server",
    component: "metadata/server/index.js",
    icon: "user",
		name: "服务器",
		system
	},
	{
		path:"/metadata/system",
    icon: "user",
		name: "系统参数",
		system
	},
  {
    path: "/metadata/system/system",
    component: "metadata/system/system.js",
    icon: "user",
		name: "系统管理",
		system,
		parentPath:"/metadata/system"
  },
  {
    path: "/metadata/system/theme",
    component: "metadata/system/theme.js",
    icon: "user",
		name: "主题管理",
		system,
		parentPath:"/metadata/system"
  }
];
