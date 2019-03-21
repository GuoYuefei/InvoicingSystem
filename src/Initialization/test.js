
// 应用 状态提升
import React, {Component} from 'react'


/**
 * 状态提升，将控制变量交由父组件掌管。高级部分还可以通过使用ref
 */
class MInput extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <input name={this.props.name} value={this.props.value} onChange={this.props.handerChange} />
        )
    }
}

// // 正常下拉框 使用状态提升
// function MySelect(props) {
//     let ops = [0,1,2,3,4]
//     return (
//         <fieldset>
//             <legend>{props.legend}</legend>
//             <select name={props.name}>
//                 {ops.map((value, index) => 
//                     <option key={index} value={value}>{value}</option>
//                 )}
//             </select>
//         </fieldset>
//     )
// }

class MySelect extends Component {

    constructor(props) {
        super(props);
        this.ops = [0,1,2,3,4]
        this.record = this.ops[0];
    }


    handerChange = (e) => {
        //用record记录select的值
        this.record = e.target.value
        console.log(this.record)
    }

    render() {
        return (
            <div>
                <label>{this.props.label+":\t"}</label>
                <select onChange={this.handerChange}>
                    {this.ops.map((value, index) => 
                        <option key={index} value={value}>{value}</option>
                    )}
                </select>
            </div>
        )
    }
}

export class Test extends Component {
    
    constructor(props) {
        super(props);
        this.iputname = "haha"
        this.state = {
            record: 0
        }
    }

    handerChange = (e) => {
        const etar = e.target;
        console.log(etar)
        this.setState({
            record: e.target.value
        })
        // console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <MInput name={this.iputname} value={this.state.record} handerChange={this.handerChange}/>
                <h5>{this.state.record}</h5>
                <MySelect label="测试"/>
            </div>
        )
    }
}

