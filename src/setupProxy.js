const apiMocker = require("mocker-api");
const path = require("path");

//配置进行mock代理
module.exports = (app)=>{
	apiMocker(app,path.resolve('./mock/index.js'))
}