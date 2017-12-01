const reducer = (state="卖座电影",info)=>{
	

	let {type,payload} = info;
	switch(type){
		case "changeCardReducer":
			var newlist=[...state];
			newlist.push(payload);
			return payload;
		default :
			return state;
	}
	return state;
}

//reducer 的设计必须是一个纯函数

const comingsoonreducer = (state=[],info)=>{
	let {type,payload} = info;
	switch(type){
		case "comingsoonlist":
			return [...payload];
		default :
			return state;
	}
}

const getseachlistreduce = (state=[],info)=>{
	let {type,payload} = info;
	switch(type){
		case "getseachlist":
			return [...payload];
		default :
			return state;
	}
}



export {reducer,comingsoonreducer,getseachlistreduce};



