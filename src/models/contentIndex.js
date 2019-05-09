/**  */

import { getTotalData } from "../services/get/contentIndex";

// type TotalDataType = {
//     score: string,
//     amount: number,
//     invalidatedTicket: number,
//     refund: number,
//     refundAmount: number,
// }

let contentIndex: any = {
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
                type: 'updateTotalDataAll',
                updateTotal: data
            })
            
        }
    },

    reducers: {
        updateTotalDataAll(state, {updateTotal}) {
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