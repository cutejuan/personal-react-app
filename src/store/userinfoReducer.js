const initialState = {}

// action
export const userUpdate = (data)=>({
	type: 'userinfoUpdate',
	value: data
})

export default (state=initialState, action)=>{
	switch (action.type){
		case 'userinfoUpdate':
			return action.value;
			
		default:
			return state
	}
}