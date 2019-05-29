/**
* @description ticketRecord页面所需的model
* @author Solomon
* @license MIT
* @created 2019-05-28T14:32:54 Z+08:00
* @last_modified 2019-05-28T19:59:53 Z+08:00
* 
* @flow 
*/

import { insertOne } from '../services/ticketRecordS'

type ModelType = {
    namespace: string,
    state: any,
    effects: Object,
    reducers: Object,
    subscriptions?: Object,
}

let ticketRecordM: ModelType = {
    namespace: 'ticketRecordM',

    state: {},

    effects: {
        *insertOne({data}, {call, put}) {
            const n = yield call(insertOne, data)                 // 返回1就代表成功
            yield put({
                type: "insertOneIsOk",
                result: n
            })
        }
    },

    reducers: {
        insertOneIsOk(state, result){
            let newState = {
                ...state,
                insertOneIsOk: result
            }

            return newState
        }
    }


}

export { ticketRecordM }
