/**
* @description 对beject的一些操作，包括修改对象的部分属性和删减部分属性
* @author Solomon
* @license MIT
* @created 2019-05-21T11:00:00 Z+08:00
* @last_modified 2019-05-21T15:38:37 Z+08:00
* 
* @flow 
*/

// TODO 一个解析location的函数
// location的字符串应该是“xx.yy.zz”的结构，通过这种来定位需要改变属性的位置

function analyLoc(location: string): string[] {
    return location.split('.')
}

/**
 *      {
            modalData: {
                state: {
                    loading: false,        
                    visible: false,
                },
                
            }
        }
 * 
 * location = "modalData.state.loading"
 * modify true
 */

function assign<T>(source: T, location: string, modify: any): T {

    let result: T = {
        ...source
    }

    let locs = analyLoc(location)
    let point: any = result;
    let points: Array<any> = []

    locs.forEach((v, i, a) => {
       
        point = point[v]
        points.push(point)
    })

    points[points.length-1] = modify

    for(let i = points.length-1; i > 0; i--) {
        points[i-1][locs[i]] = points[i]
    }

    result = points[0]

    return result
}


export { assign }