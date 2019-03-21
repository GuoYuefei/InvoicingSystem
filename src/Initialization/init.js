// 主要写初始化部分的组件
import React, { Component } from 'react';

export class TimeInit extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    componentDidMount() {
        this.timeid = setInterval(() => {
            this.tick()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeid)
    }

    render() {
        return (
            <div>
                <h4>当前时间是： {this.state.date.toLocaleString()}</h4>
                <p>若不正确请检查本地时间</p>
            </div>
        )
    }
}

// 正常输入框 使用状态提升
// props {title:xxx, value:xxx, handerChange: function(e) }
function MyInput(props) {
    return (
        <div>
            <label>{props.title+":"}</label>
            <input name={props.name||'undefined'} value={props.value} onChange={props.handerChange} />
        </div>
    )
}

// 正常下拉框 使用状态提升
// props {title:xxx, values:[{value:xxx, name:xxx}, ...], handerChange: function(e) }
function MySelect(props) {
    return (
        <div>
            <label>{props.title+":"}</label>
            <select name={props.name||'undefined'} onChange={props.handerChange}>
                {props.values.map((value, index) => 
                    <option key={index} value={value.value}>{value.name}</option>
                )}
            </select>
        </div>
    )
}

//第二个页面
/**
 * props: {
 *  taxpayerName: {name:"",value:"", handerChange: this.props.handerChange1},
 *  taxpayerID: {name:"",value:"", handerChange: this.props.handerChange2},
 *  category: {name:"",values:[{name:"", value:""}], handerChange: this.props.handerChange3},
 *  billintype: {name:"",values:[], handerChange: this.props.handerChange4} 
 * }
 * 检查输入的业务逻辑应该由这个组件完成
 */
export class BaseInfo extends Component {

    constructor(props) {
        super(props);
        this.titles = ["纳税人名称", "纳税人识别码", "行业分类", "开票种类"]

    }

    /**
     * 用于检测name字段的输入，组合父组件传入的函数
     * @param fun funtion which is provided by father assembly
     * @returns function(e)
     */
    // handerChange = (fun) => {
    //     // FIXME 检查字段功能
    //     return (e) => {
    //         // const target = e.target
    //         // TODO 学正则中。。。 
    //     }
    // }



    render() {
        const info = this.props.info;
        // 这里还是通过传入监听函数来缩小监听范围, 但是handerChange函数是由父组件提供的，所以，我们可以在这里生成写一个函数来组合父组件穿过来的函数
        return(
            <div>
                <MyInput name={info.taxpayerName.name}  title={info.taxpayerName.title||this.titles[0]}
                    value={info.taxpayerName.value} handerChange={info.taxpayerName.handerChange} />
                <MyInput name={info.taxpayerID.name} title={info.taxpayerID.title||this.titles[1]}
                    value={info.taxpayerID.value} handerChange={info.taxpayerID.handerChange} />
                <MySelect name={info.category.name} title={info.category.title||this.titles[2]} 
                    values={info.category.values} handerChange={info.category.handerChange} />
                <MySelect name={info.billintype.name} title={info.billintype.title||this.titles[3]} 
                    values={info.billintype.values} handerChange={info.billintype.handerChange} />
            </div>
        )
    }
}






function Button(props) {
    return (
        <button onClick = {props.handerClick}>{props.value}</button>
    )
}

// 多个按钮 传入数据bset需要的[{value: xxx, handerClick: xxxx},...]
export class Buttons extends Component {

    // constructor(props) {
    //     super(props);
    // }


    render() {
        return(
            <div>
                {this.props.bsets.map((bset, index) => 
                    <Button key={index} value={bset.value} handerClick={bset.handerClick}/>
                )}
            </div>
        )
    }
}

// // Buttons的特殊实例 下一步取消
// export class ButtonsNextAndCancel extends Component {
//     constructor(props) {
//         super(props);
//         this.bsets = [{value: "下一步", handerClick: this.handerClick1},{value: "取消", handerClick: this.handerClick2}];
//     }

//     handerClick1 = () => {
//         console.log("这是handerClick1")
//     }

//     handerClick2 = () => {
//         console.log("这是handerClick2")
//     }


//     render() {
//         return(
//             <div>
//                 <Buttons bsets={this.bsets} />
//             </div>
//         )
//     }
// }

export class Win extends Component {

    constructor(props) {
        super(props);
        this.bsets = [
            {value: "Next", handerClick: this.handerClickNext},
            {value: "Cancel", handerClick: this.handerClick2}
        ]
        
        this.state = {
            
            //Baseinfo
            baseinfo: {
                taxpayerName: {name:"taxpayerName",value:"1", handerChange: this.handerChange("taxpayerName")},
                taxpayerID: {name:"taxpayerID", value:"2", handerChange: this.handerChange("taxpayerID")},
                category: {name:"category", values:[{name:"1", value:"1"},{name:"2", value:"2"}], handerChange: this.handerChange("category")},
                billintype: {name:"billintype", values:[{name:"2", value:"2"}], handerChange: this.handerChange("billintype")} 
            },

            /******************* */

            // main: this.mains[0], 
            mainCounter: 0,
            buttons: <Buttons bsets={this.bsets} />
        }
    }

    // 动态构造所需函数，减少代码量
    handerChange = (attr) => {
        // 返回一个handerChange的函数
        return (e) => {
            const target = e.target;
            // console.log(target,target.value);
            // console.log(this.state)
            // 注意这个函数不是深拷贝
            const att = Object.assign({}, this.state.baseinfo[attr], {value: target.value})     //对select记录值，对input更新并记录值

            const baseinfo = Object.assign(
                {}, this.state.baseinfo, {[attr]: att}
            )
            console.log(baseinfo)
            const state = Object.assign({}, this.state, {baseinfo: baseinfo})
            console.log(state)
            this.setState(state)
            // this.setState((prevState, props) => ({
            //     baseinfo: {taxpayerName:{value:target.value}}
            // }))
        }
        
    }

    handerClick1 = () => {
        // TODO 
        console.log("this is handerClick1")
    }

    handerClickNext = () => {
        // TODO
        console.log("this is handerClick2")
        //暂存信息 todo ps.值已经在handerChange中记录了


        //切换页面
        let mainCounter = this.state.mainCounter
        const state = Object.assign({}, this.state, {mainCounter:mainCounter+1})
        this.setState(state)
    }

    render() {
        const mains = [
            <TimeInit />,
            <BaseInfo info={this.state.baseinfo} />
        ]

        // TODO 将来完成后需要改，最后需要一个跳转路由
        const main = mains[this.state.mainCounter>=mains.length?mains.length-1:this.state.mainCounter]
        // const main = this.mains[this.state.mainCounter]
        return (
            <div>
                {main}
                {/* <BaseInfo info={this.state.baseinfo} /> */}
                {this.state.buttons}
            </div>
        )
    }
}


