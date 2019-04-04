/**
 * 此文件为配置webpack,部分路径的简化名称
 */
const path = require("path");

const baseUrl = path.resolve(__dirname,"../../src");

module.exports = {
	//存放reducers
	reducers:`${baseUrl}/reducers`,
	//存放容器组件
	pages:`${baseUrl}/pages`,
	//存放木偶组件
	components:`${baseUrl}/components`,
	//工具配置类文件
	utils:`${baseUrl}/utils`,
}