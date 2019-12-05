import {get, post} from './fetch'

const getAdData = function(){
	let result = get('/api/homead');
	return result
}

const getListData = function (city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}

const postComment = function (id, comment, star) {
    const result = post('/api/submitComment', {
        id: id,
        comment: comment,
        star: star
    })
    return result
}

const getSearchData = function (page, cityName, category, keyword) {
    const keywordStr = keyword ? '/' + keyword : ''
    const result = get('/api/search/' + page + '/' + cityName + '/' + category + keywordStr)
    return result
}

const getInfoData = function (id) {
   const result = get('/api/detail/info/' + id)
   return result
}

const getCommentData = function (page, id) {
    const result = get('/api/detail/comment/' + page + '/' + id)
    return result
}

export default {
	getAdData,
	getListData,
	postComment,
	getSearchData,
	getInfoData,
	getCommentData
}