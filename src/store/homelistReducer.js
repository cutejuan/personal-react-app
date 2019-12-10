import api from '../utils/api'
const {getListData} = api

const initialState = {
    likelist: []
}

// 同步获取action
export const addLikelist = (newData)=>({
    type: 'addLikelist',
    value: newData
})

// 异步action
export const requestNewList = (params)=> async (dispatch) => {
    console.log('异步请求猜你喜欢...');
    let result = await getListData();
    
    let newList = [];

    result.json()
    .then(data=>{
        newList = data.data;
        
        let action = addLikelist(newList);
        dispatch(action);

    }).catch(err=>{
        console.error('仓库请求猜你喜欢失败', err.message);
    })
}

export default (state=initialState, action)=>{
    switch (action.type) {
        case 'addLikelist':
            return {
                ...state,
                likelist: [...state.likelist, ...action.value]
            }

        default:
            return state;
    }
}