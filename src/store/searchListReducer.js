import api from '../utils/api'
const {getSearchData} = api

const initialState = {
    searchList: []
}

// 同步获取action
export const addSearchlist = (newData)=>({
    type: 'addSearchlist',
    value: newData
})

// 异步action
export const requestNewSearch = (params)=> async (dispatch) => {
    console.log('异步搜索数据...');
    let result = await getSearchData();
    
    let newList = [];

    result.json()
    .then(data=>{
        newList = data.data;
        
        let action = addSearchlist(newList);
        dispatch(action);

    }).catch(err=>{
        console.error('搜索数据失败', err.message);
    })
}

export default (state=initialState, action)=>{
    switch (action.type) {
        case 'addSearchlist':
            return {
                ...state,
                searchList: [...state.searchList, ...action.value]
            }

        default:
            return state;
    }
}