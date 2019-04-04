/**
 * 全局页面加载提示
 */
import React from  "react";
import { Icon } from "antd";
import "./index.less";

const index = ()=>{

	return(
		<div className="my-frame-loading" >
			<div className="my-frame-warp" ></div>
			<div className="my-frame-icon" ><Icon  type="loading" /></div>
		</div>
	)
}

export default index;