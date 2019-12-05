import 'whatwg-fetch'

const get = function (url){
    var result = fetch(url,{
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    })
    return result;
}

// 解析post参数,把obj拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
const postParams = function(obj){
    var result = '';
    for (var item in obj){
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }
    if(result){
        result = result.slice(1)
    }
    return result;
}

const post = function(url, params){
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postParams(params)
    }) 

    return result;
}

export default {
    get,
    post
}