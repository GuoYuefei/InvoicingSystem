// @flow
// 主要写初始化部分的组件
import React, { Component } from 'react';
import {Table} from 'react-bootstrap'

// 第一个页面
export class TimeInit extends Component<any> {
    
    // FLOW 应该标记类型为NodeJS.Timeout, 可能是flow的问题 
    timeid: any;         
    state: any;   
    setState: any;      // 参数不做类型检查
    constructor(props: any) {
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
// 第一个页面end

// 正常输入框 使用状态提升
// props {title:xxx, [name: xxx], [tip:xxx], value:xxx, handerChange: function(e) }
function MyInput(props: {title: string, name: any, tip: any, value: string, handerChange: Function}) {
    return (
        <div>
            <label>{props.title+":"}</label>
            <input name={props.name||'undefined'} value={props.value} onChange={props.handerChange} />
            {
                    // todo新加的提示文本，在外层实现后将TODO改成todo
                    props.tip && <span style={{color:"red"}}>{props.tip} 23333333</span>
            }
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
export class BaseInfo extends Component<any> {
    // FLOW
    titles: string[];
    constructor(props: any) {
        super(props);
        this.titles = ["纳税人名称", "纳税人识别码", "行业分类", "开票种类"]

    }

    render() {
        const info = this.props.info;
        // 这里还是通过传入监听函数来缩小监听范围, 但是handerChange函数是由父组件提供的，所以，我们可以在这里生成写一个函数来组合父组件穿过来的函数
        return(
            <div>
                <MyInput name={info.taxpayerName.name} tip={info.taxpayerName.tip}  title={info.taxpayerName.title||this.titles[0]}
                    value={info.taxpayerName.value} handerChange={info.taxpayerName.handerChange} />
                <MyInput name={info.taxpayerID.name} tip={info.taxpayerID.tip} title={info.taxpayerID.title||this.titles[1]}
                    value={info.taxpayerID.value} handerChange={info.taxpayerID.handerChange} />
                <MySelect name={info.category.name} title={info.category.title||this.titles[2]} 
                    values={info.category.values} handerChange={info.category.handerChange} />
                <MySelect name={info.billintype.name} title={info.billintype.title||this.titles[3]} 
                    values={info.billintype.values} handerChange={info.billintype.handerChange} />
            </div>
        )
    }
}

// FLOW 因为props类型难以确定所以用any代替
type Props = any;

// TODO 第三个页面
// ps 第三个页面切分组件有些多表，表单外层，内层还可以在分解
export class Adddrawer extends Component<Props> {
    jsonData: string
    constructor(props: Props) {
        super(props)
        // TODO 这个是造的数据
        this.jsonData = '{"arr": [{"loginname":"gyf", "character": "管理员", "name": "郭月飞"}, {"loginname":"tam", "character": "管理员", "name": "天安门"}]}';
    }

    render() {
        return(
            <ADTable json={this.jsonData}/>
        )
    }
}

// table主体
class ADTable extends Component<Props> {

    renderTbody: Function

    constructor(props: {arr:{loginname:string, character: string, name: string}[]}) {
        super(props)
        this.renderTbody = this.renderTbody.bind(this)
    }

    // 生成tbody
    // json {arr: [{loginname:xxx, character: xxx, name: xxx}]}
    renderTbody(json: string) {
        console.log(json)
        let obs = JSON.parse(json).arr;
        console.log(obs)
        const trs = obs.map((ob, index) => 
            <tr>
                <td>{index}</td>
                <td>{ob.loginname}</td>
                <td>{ob.character}</td>
                <td>{ob.name}</td>
            </tr>
        )
        return (
            <tbody>
                {trs}
            </tbody>
        )
    }

    // TODO table显示数据应该来自json，这里先在本地造json，以后添加异步请求json数据
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>开票人登录名</th>
                    <th>角色</th>
                    <th>姓名</th>
                    </tr>
                </thead>
                {this.renderTbody(this.props.json)}
            </Table>
        )
    }
}

// TODO 增加开票人的模态框










function Button(props: {value: string, handerClick: Function, disabled: boolean}) {
    return (
        <button onClick = {props.handerClick} disabled = {props.disabled}>{props.value}</button>
    )
}

// FLOW
// 多个按钮 传入数据bset需要的[{value: xxx, handerClick: xxxx},...] 
export class Buttons extends Component<{bsets: Array<{value: string, handerClick: Function, disabled: boolean}>}> {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div>
                {this.props.bsets.map((bset, index) => 
                    <Button key={index} value={bset.value} handerClick={bset.handerClick} disabled={bset.disabled}/>
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

export class Win extends Component<any> {

    // bsets: Array<{value: string, handerClick: Function, disabled: boolean}>;
    state: any;

    constructor(props:any) {
        super(props);
        // this.bsets = [
        //     {value: "Next", handerClick: this.handerClickNext, disabled: false},
        //     {value: "Cancel", handerClick: this.handerClick1, disabled: false}
        // ]
        
        this.state = {

            bsets: [
                {value: "Next", handerClick: this.handerClickNext, disabled: false},
                {value: "Cancel", handerClick: this.handerClick1, disabled: false} 
            ],
            
            //Baseinfo
            baseinfo: {
                taxpayerName: {name:"taxpayerName", value:"", tip:"" , handerChange: this.handerChange("taxpayerName")},
                taxpayerID: {name:"taxpayerID", value:"", tip:"", handerChange: this.handerChange("taxpayerID")},
                category: {name:"category", values:[{name:"1", value:"1"},{name:"2", value:"2"}], handerChange: this.handerChange("category")},
                billintype: {name:"billintype", values:[{name:"2", value:"2"}], handerChange: this.handerChange("billintype")} 
            },

            /******************* */

            // main: this.mains[0], 
            mainCounter: 0,
            // buttons: <Buttons bsets={this.state.bsets} />
        }
    }

    // 动态构造所需函数，减少代码量 
    handerChange = (attr: string) => {
        // todo 这里应该对输入的内容做限制 限制函数可以写在这个函数里面
        // TODO 新加todo，可能将来需要返回这个函数，这时候应该在外面再写一个函数，并返回这个函数
        let limit: Function = (str: string) => {
            let patt: RegExp;
            let message: string;
            switch (attr) {
                case this.state.baseinfo.taxpayerName.name:
                    // 纳税人名称 ^[\u4e00-\u9fa5]{2,12}$ 中文吧，应该不会超过12个字了吧
                    patt = /^[\u4e00-\u9fa5]{2,12}$/;
                    message = patt.test(str) ? "" : "纳税人姓名应为2-12个中文字符"
                    break;
                case this.state.baseinfo.taxpayerID.name:
                    // 纳税人识别码 数字15、18、20位
                    patt = /^[0-9]{15}$|^[0-9]{18}$|^[0-9]{20}$/;
                    message = patt.test(str) ? "" : "纳税人识别码应为15、18或者20位数字";
                    break;
                default: return "error";
            }
            return message;
        }




        // FLOW
        // 返回一个handerChange的函数
        return (e: Event) => {
            const target: any = e.target;
            // console.log(target,target.value);
            const value: string = target.value;
            let alter = {value: value, tip: limit(value)}

            // this.bsets[0].disabled = !alter.tip  
            let bsets = this.state.bsets;
            
            // console.log(alter)
            
            // 注意这个函数不是深拷贝
            const att = Object.assign({}, this.state.baseinfo[attr], alter)     //对select记录值，对input更新并记录值
            
            const baseinfo = Object.assign(
                {}, this.state.baseinfo, {[attr]: att}
            )

            // console.log(baseinfo)
            
            // fixme 有问题，当一个输入框满足条件后就将按钮置可用 
            // 解决方案，先将tip更新入state，然后查询baseinfo的两个属性的tip，设定bsets，然后再更新一次。  react本身用的就是虚拟DOM，所以效率差不了多少
            // ps: 在写解决方案的时候发现优化方法 在setState之前就已经在本地拿到state.baseinfo了，直接做判定
            // THINK 为什么我没将bset重新setState也能成 ？：？：？：那是因为我拿到的是引用不是内存复制，其实就是对state中bsets数组 ： solomon
            bsets[0].disabled = baseinfo.taxpayerName.tip || baseinfo.taxpayerID.tip ? true : false;
            
            let state = Object.assign({}, this.state, {baseinfo})
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
        let bsets = this.state.bsets;
        bsets[0].disabled = true;
        const state = Object.assign({}, this.state, {mainCounter:mainCounter+1, bsets: bsets})
        this.setState(state)
    }

    render() {
        const mains = [
            <TimeInit />,
            <BaseInfo info={this.state.baseinfo} />
        ]

        // TODO 将来完成后需要改，路由逻辑上要优化
        const main = mains[this.state.mainCounter>=mains.length?mains.length-1:this.state.mainCounter]
        // const main = this.mains[this.state.mainCounter]
        return (
            <div>
                {main}
                {/* <BaseInfo info={this.state.baseinfo} /> */}
                {/* {this.state.buttons} */}
                <Adddrawer />
                <Buttons bsets={this.state.bsets}/>
            </div>
        )
    }
}


