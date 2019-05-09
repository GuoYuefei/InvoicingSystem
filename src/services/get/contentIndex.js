import request from '../../utils/request'

let getTotalData = function () {
    return request("http://127.0.0.1:8080/today/test", {
        method: 'get',
    })
}



export { getTotalData }