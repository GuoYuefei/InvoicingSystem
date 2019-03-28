// @flow
// 主要写初始化部分的组件
import React, { Component } from 'react';
import {Table, Modal, Button, ButtonToolbar} from 'react-bootstrap'

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

type TYPEInputProps = {type?: string, title: string, name?: string, tip?: string, value: string, handerChange?: Function}

// 正常输入框 使用状态提升
// props {title:xxx, [name: xxx], [tip:xxx], value:xxx, handerChange: function(e) }
// 3.27 改造 新增type可选属性
// FLOW 对象可选属性用?: 。函数可选参数用:?, 变态的flow 
function MyInput(props: TYPEInputProps) {
    return (
        <div>
            <label>{props.title+":\t"}</label>
            <input type={props.type || 'text'} name={props.name||'undefined'} value={props.value} onChange={props.handerChange} />
            {
                    // todo新加的提示文本，在外层实现后将TODO改成todo
                    props.tip && <span style={{color:"red"}}>{props.tip} </span>
            }
        </div>
    )
}

// 正常下拉框 使用状态提升
// props {title:xxx, values:[{value:xxx, name:xxx}, ...], handerChange: function(e) }
function MySelect(props) {
    return (
        <div>
            <label>{props.title+":\t"}</label>
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
                {/* THINK {新get的写法，传入参数同名的情况下可以简写，es6} */}
                <MyInput {...info.taxpayerName} title={info.taxpayerName.title||this.titles[0]} />
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
            <div>
                <ADTable json={this.jsonData}/>
                <ADModal mbody={<AdddraForm/>}/>
            </div>
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
            <tr key={index}>
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
// 这里只提供一个模态框，但是Body内容有参数生成
class ADModal extends Component<Props> {

    state: any
    setState: any
    // TODO 模态框暂时只接受一个组件类型填充body内容，以后要有自定义各种配置
    constructor(props: {mbody: Component<any>}) {
        super(props)
        this.state = {
            modalShow: false
        }
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false } );
        return (
            <div>
                <Modal
                    show = {this.state.modalShow}
                    onHide = {modalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        增加开票人
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        {this.props.mbody}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                        >
                        Launch vertically centered modal
                    </Button>

                    {/* <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    /> */}
                </ButtonToolbar>
            </div>
        );
      }
}

// TODO 增加开票人or修改开票人表单
// {type?: string, title: string, name?: string, tip?: string, value: string, handerChange?: Function}
// props {title:xxx, values:[{value:xxx, name:xxx}, ...], handerChange: function(e) }
class AdddraForm extends Component<Props> {

    state: Object

    constructor(props) {
        super(props)
        // TODO 先将东西放在这个组件中，以后搬运到父组件，因为父组件需要控制这个组件的输入
        // THINK 输入控制能否让组件自我控制呢，然后父组件仅需要传入一个获取值的函数 ：？：？：？ 应该是可以的
        this.state = {
            info: {
                loginname: {title: "登陆名", name: "loginname", value: "", tip: "", handerChange: this.handerChange("loginname")},
                truename: {title: "姓名", name: "truename", value: "", tip: "", handerChange: this.handerChange("truename")},
                role: {title: "角色", name: "role", values: [{value:'1', name:'1'}, {value:'2', name:'2'}], handerChange: this.handerChange("role")},
                loginpasswd: {type:"password", title: "登陆密码", name: "loginpasswd", value: "", tip: "", handerChange: this.handerChange("loginpasswd")},
            }
            
        }
    }

    // props里应该也有一个change的函数提供，但是那个函数只能取值，所有的值约束，改变什么的都应该由本函数返回的函数实现。
    // THINK 前期第二个页面我设计的是全由最外层组件完成，现在想想外层父组件会变得庞大。所以重新进行责任划分，将由子组件完成的工作仍然有子组件完成
    handerChange = (infokey: string) => {

        let limit: Function = (str: string) => {
            let patt: RegExp;
            let info = this.state.info;
            let message = "";
            switch(infokey) {
                case info.truename.name:
                    patt = /^[\u4e00-\u9fa5]{2,12}$/;
                    message = patt.test(str) ? "" : "姓名应为2-12个中文字符";
                    break;
                case info.loginname.name:
                    patt = /^[\w]{2,}$/;   
                    message = patt.test(str) ? "" : "登陆名应为大于2个普通字符";
                    break;
                case info.loginpasswd.name:
                    patt = /^.{8,20}$/;
                    message = patt.test(str) ? "" : "密码应为8-20位字符"
                    break;
                default:
                    message = "error";
            }
            return message;
        }


        // 返回一个检测change的函数
        return (e: Event) => {
            let info: any = this.state.info;
            let target: any = e.target;
            let value: string = target.value;
            info[infokey].value = value;

            info[infokey].tip = limit(value);

            // TODO ？？？？从父组件中传入方法 怎么把数据传出到父组件呢？？？   事实证明，react的数据流只能向下流动，果断放弃
            

            // 从这里更加可知，这个函数不过是为了通知react进行刷新而已
            this.setState(this.state);
        }
    }


    render() {
        return (
            <div>
                <MyInput {...this.state.info.loginname} />
                <MyInput {...this.state.info.truename} />
                <MySelect {...this.state.info.role} />
                <MyInput {...this.state.info.loginpasswd} />
            </div>
        )
    }
}




function MyButton(props: {value: string, handerClick: Function, disabled: boolean}) {
    return (
        <button onClick = {props.handerClick} disabled = {props.disabled}>{props.value}</button>
    )
}

// 多个按钮 传入数据bset需要的[{value: xxx, handerClick: xxxx},...] 
export class Buttons extends Component<{bsets: Array<{value: string, handerClick: Function, disabled: boolean}>}> {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div>
                {this.props.bsets.map((bset, index) => 
                    <MyButton key={index} value={bset.value} handerClick={bset.handerClick} disabled={bset.disabled}/>
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


