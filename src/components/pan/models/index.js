/**
 * 此函数为models方法
 */


const formartSingleModel = (model)=>{
	const { namespace,state,reducers,effects } = model; 
	
	if(ty){

	}
	

	return {
		state,reducers,effects,namespace
	}
}

export default models = (params)=>{

	//用于存放namespace,且只能唯一
	let namespace = [];

	//用于存放 saga
	let effects = [];
	
	//用于存放reducer
	let reducers = [];



	if(typeof params === "undefined"){

	}else if(Object.prototype.toString.call(params) === '[object Object]'){
		const { namespace } = params;
		if(typeof namespace !== "undefined"){
			if(!args.includes(namespace)){
				 formartSingleModel(params);
			}else{
				throw new Error(`The namespace is not allowed to reapeat,${namespace} has been reapeated.`)
			}
		}else{
			throw new Error(`The namespace is not allowed to be empty!`)
		}


	}else if(Object.prototype.toString.call(params) === '[object Array]'){

	}else{
		throw new Error("function models params type is not Object/Array!");
	}
}