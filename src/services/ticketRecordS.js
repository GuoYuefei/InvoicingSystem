/**
* @description 
* @author Solomon
* @license MIT
* @created 2019-05-28T15:17:19 Z+08:00
* @last_modified 2019-05-29T10:48:03 Z+08:00
* 
* flow不检查类型 append第二参数只允许blob和string类型，事实上都可以
*/

import request from '../utils/request'

let insertOne = function(data: {invoiceCode: string, begin: number,
                        end: number, date: string}) {
                            // console.log("will see : ", data)
    let formData = new FormData();

    let keys = Object.keys(data);
    let values = Object.values(data);

    formData.append("state", false)

    values.forEach((v, i ,a) => {
        formData.append(keys[i], v)
    })



    return request("http://127.0.0.1:8080/invoice/insertOnes", {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'Content-Type': 'application/json'             //表单数据
        },
        body: formData
        
    })
}

export { insertOne }