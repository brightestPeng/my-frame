import routes from "pages/router";

//反递归算法
const getParentFunction = (childList, parentList) => {
	let nameList = new Set([]);
	let newArray = [];
	let end = true;

	//收集所有的parentPath
	childList.forEach(index => {
		if (index.parentPath) {
			end = false;
			nameList.add(index.parentPath);
		}
	});

	if (end) {
		return childList;
	} else {
		for (let index of nameList.keys()) {
			parentList.forEach(item => {
				if (item.path === index) {
					newArray.push({
						...item,
						children: childList.filter(v => v.parentPath === index)
					});
				}
			});
		}
		return getParentFunction(newArray, parentList);
	}
};



const authRouter = ({ pathname, systemList = [], menuList = [] }) => {
  //初始化每个系统的首页
  const systemIndex = {};

  systemList.forEach(systemName => {

		systemIndex[systemName]  = {};

    //得到当前系统的所有路由
    let systemRouteList = routes.filter(index => {
      return index.system === systemName;
    });

    //得到当前用户有权限的所有路由
    let routeList = systemRouteList.filter(index =>
      menuList.includes(index.path)
    );

    //确定有权限系统首页
    if (routeList.length > 0) {
      systemIndex[systemName].indexPage = routeList[0];
    }

		systemIndex[systemName].menu = getParentFunction(routeList,systemRouteList);
  });

  return systemIndex;
};

export default authRouter;
