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
 *  taxpayerName: {value:"", handerChange: this.props.handerChange1},
 *  taxpayerID: {value:"", handerChange: this.props.handerChange2},
 *  category: {values:[{name:"", value:""}], handerChange: this.props.handerChange3},
 *  billintype: {values:[], handerChange: this.props.handerChange4} 
 * }
 */
export class BaseInfo extends Component {

    constructor(props) {
        super(props);
        this.titles = ["纳税人名称", "纳税人识别码", "行业分类", "开票种类"]

    }
    render() {
        const info = this.props.info;

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
            {value: "Next", handerClick: this.handerClick1},
            {value: "Cancel", handerClick: this.handerClick2}
        ]
        this.state = {
            
            //Baseinfo
            baseinfo: {
                taxpayerName: {name:"taxperName",value:"1", handerChange: this.handerChange1},
                taxpayerID: {name:"taxpayerID", value:"2", handerChange: this.handerChange0},
                category: {name:"category", values:[{name:"", value:""}], handerChange: this.handerChange0},
                billintype: {name:"billintype", values:[{name:"", value:""}], handerChange: this.handerChange0} 
            },


            /******************* */
            main: <TimeInit />, 
            buttons: <Buttons bsets={this.bsets} />
        }
    }

    handerChange0 = (e) => {
        // console.log(e.target)
    }

    // todo 使用动态属性名来创建函数实现不同的功能
    handerChange1 = (e) => {
        const target = e.target;
        console.log(target);
        // console.log(this.state)
        // 注意这个函数不是深拷贝
        const taxpayerName = Object.assign({}, this.state.baseinfo.taxpayerName, {value: target.value})

        const baseinfo = Object.assign(
            {}, this.state.baseinfo, {taxpayerName: taxpayerName}
        )
        // console.log(baseinfo)
        const state = Object.assign({}, this.state, {baseinfo: baseinfo})
        this.setState(state)
        // this.setState((prevState, props) => ({
        //     baseinfo: {taxpayerName:{value:target.value}}
        // }))
    }

    handerClick1 = () => {
        // TODO 
        console.log("this is handerClick1")
    }

    handerClick2 = () => {
        // TODO
        console.log("this is handerClick2")
    }

    render() {
        return (
            <div>
                {this.state.main}
                <BaseInfo info={this.state.baseinfo} />
                {this.state.buttons}
            </div>
        )
    }
}


