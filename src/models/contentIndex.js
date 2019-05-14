/** @flow  */

import { getTotalData } from "../services/get/contentIndex";

// type TotalDataType = {
//     score: string,
//     amount: number,
//     invalidatedTicket: number,
//     refund: number,
//     refundAmount: number,
// }

type ModelType = {
    namespace: string,
    state: any,
    effects: Object,
    reducers: Object,
    subscriptions?: Object,
}

let contentIndex: ModelType = {
    namespace: 'contentIndex',

    state: {

    }, 
    
    effects: {
        // fetch
        *fetchData({updateTotal},{call, put}) {
            
            // console.log(updateTotal)        // see {a: 'a'}
            // console.log("I'm run")
            const {data} = yield call(getTotalData)
            yield put({
                type: 'updateTotalDataAll',             // THINK reducers中方法
                updateTotal: data                       // THINK 方法中携带的信息
            })
            
        }
    },

    reducers: {
        updateTotalDataAll(state, {updateTotal}) {          // THINK updateTotal是effects中put的除type之外的属性内容
            delete updateTotal.id
            let result: any = {
                ...state,
                updateTotal: {
                    today: updateTotal,
                    thisMonth: updateTotal,
                    lastMonth: updateTotal,
                    last3Month: updateTotal,
                }
            }
            // console.log(result)
            return result
        }
    },


}

export {contentIndex}