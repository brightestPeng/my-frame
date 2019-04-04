/**
 * 此为数据集成目录下的路由配置文件
 */
const system = "gather";

export default [
  {
    path: "/gather/designplatform",
    component: "gather/designPlatform/index.js",
    icon: "user",
		name: "设计平台",
		system
  },
  {
    path: "/gather/taskCenter",
    component: "gather/taskCenter/index.js",
    icon: "user",
		name: "任务中心",
		system
  }
];


