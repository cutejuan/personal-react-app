import fetch from './fetch.js'

const getAdData = async ()=> {
    let result = await fetch.get('/api/homead');
    try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err);
    }
}

const getListData = async (city, page) => {
    const result = await fetch.get('/api/homelist/' + encodeURIComponent(city) + '/' + page)

    try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err)
    }
}

const postComment = function (id, comment, star) {
    const result = fetch.post('/api/submitComment', {
        id: id,
        comment: comment,
        star: star
    })
    return result
}

const getSearchData = function (page, cityName, category, keyword) {
    const keywordStr = keyword ? '/' + keyword : ''
    const result = fetch.get('/api/search/' + page + '/' + cityName + '/' + category + keywordStr)
    try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err);
    }
}

const getInfoData = function (id) {
   const result = fetch.get('/api/detail/info/' + id)
   try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err);
    }
}

const getCommentData = function (page, id) {
    const result = fetch.get('/api/detail/comment/' + page + '/' + id)
    try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err);
    }
}

const getOrderListData = function (username) {
    const result = fetch.get('/api/orderlist/' + username)
    try{
        if (!result.msg){
            return result
        }
    }
    catch(err){
        throw new Error(err);
    }
}


export default {
	getAdData,
	getListData,
	postComment,
	getSearchData,
	getInfoData,
    getCommentData,
    getOrderListData
}