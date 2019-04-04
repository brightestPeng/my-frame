
const roles = {
	admin:{
		id:1,
		name:"admin",
		psd:"admin",
		permit:["gather","metadata","analysis","security"]
	},
	visitor:{
		id:2,
		name:"visitor",
		psd:"peng",
		permit:["gather","metadata","security"]
	}
}

export default {
	login:(option)=>{
		console.log(option);

		return {
			code:"200",
			data:true
		}
	}
}