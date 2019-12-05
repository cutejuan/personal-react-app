const initialState = []

// 配置actions
export const update = (data)=>({
	type: 'storeUpdate',
	value: data
})
export const add = (item)=>({
	type: 'storeAdd',
	value: item
})
export const rm = (item)=>({
	type: 'storeRM',
	value: item
})

// 输出dispatch对象,combine之后作为createStore的参数
export default (state=initialState, action)=>{
	switch (action.type) {
		
		case 'storeUpdate':
			return action.value
			
		case 'storeAdd':
			state.unshift(action.value);
			return state;
			
		case 'storeRM':
			return state.filter(item=>{
				if (item.id !== action.value.id){
					return item
				}
			})
		
		default:
			return state;
	}
}