/**
 * 登录系统home界面
 */
import React from "react";

import { connect } from "react-redux";
import authRouter from "utils/router.helper";

import "./index.less";


const index = ({ systemList,menuList })=>{

	const systemIndex = authRouter({ systemList,menuList });

	console.log(systemIndex,"系统指针");


	return(
		<div className="my-frame-home" >
			{
				systemList.map((index,key)=><div key={key} className="my-frame-item" >{index}</div>)
			}
		</div>
	)
}

const mapStateToProps = (state)=>{

	return {
		systemList:state.systemModel.systemList,
		menuList:state.systemModel.menuList
	}
}

export default connect(mapStateToProps)(index);