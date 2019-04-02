// @flow
// 主要写初始化部分的组件
import React, { Component } from 'react';
import {Table, Form, Modal, Container, Button, ButtonToolbar, ButtonGroup, Col} from 'react-bootstrap'

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

type TYPEInputProps = {type?: string, placeholder?: string, title: string, name?: string, tip?: string, value: string, handerChange: Function}

// 正常输入框 使用状态提升
// props {title:xxx, [name: xxx], [tip:xxx], value:xxx, handerChange: function(e) }
// 3.27 改造 新增type可选属性
// FLOW 对象可选属性用?: 。函数可选参数用:?, 变态的flow 
function MyInput(props: TYPEInputProps) {
    return (
        <Col>
            <Form.Label>{props.title+":"}</Form.Label>

            <Form.Control type={props.type || 'text'} placeholder={props.placeholder || ''} name={props.name||'undefined'} value={props.value} onChange={props.handerChange} />
            {
                    // todo新加的提示文本，在外层实现后将TODO改成todo
                    props.tip && <span style={{color:"red"}}>{props.tip} </span>
            }
        </Col>
    )
}

type TYPESelectProps = {title: string, name?: string, values:Array<{value: string, name: string}>, handerChange: Function}

// 正常下拉框 使用状态提升
// props {title:xxx, name?: string values:[{value:xxx, name:xxx}, ...], handerChange: function(e) }
function MySelect(props: TYPESelectProps) {
    return (
        <Col>
            <Form.Label>{props.title+":"}</Form.Label>
            <Form.Control as="select" name={props.name||'undefined'} onChange={props.handerChange}>
                {props.values.map((value, index) => 
                    <option key={index} value={value.value}>{value.name}</option>
                )}
            </Form.Control>
        </Col>
    )
}

type TypeAllPutProps = TYPEInputProps | TYPESelectProps

// 4.2 新加表单组件，为建立高复用表单而建设
function AllPut(props: TypeAllPutProps) {
    return props.type && props.type==='select' ? <MySelect {...props} /> : <MyInput {...props} />
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
                <AllPut {...info.taxpayerName} title={info.taxpayerName.title||this.titles[0]} />
                <AllPut name={info.taxpayerID.name} tip={info.taxpayerID.tip} title={info.taxpayerID.title||this.titles[1]}
                    value={info.taxpayerID.value} handerChange={info.taxpayerID.handerChange} />
                <AllPut type="select" name={info.category.name} title={info.category.title||this.titles[2]} 
                    values={info.category.values} handerChange={info.category.handerChange} />
                <AllPut type="select" name={info.billintype.name} title={info.billintype.title||this.titles[3]} 
                    values={info.billintype.values} handerChange={info.billintype.handerChange} />
            </div>
        )
    }
}

// FLOW 因为props类型难以确定所以用any代替
type Props = any;

// TODO 第三个页面 第三页面在按下一步的时候应该需要让其修改管理密码和密保
// ps 第三个页面切分组件有些多表，表单外层，内层还可以在分解
export class Adddrawer extends Component<Props> {
    jsonData: string
    state: any
    setState: Function
    confirm: {name: string, fun: Function}
    adddrainfo: any
    increase: Array<{loginname: string, role: string, truename: string, loginpasswd: string}>
    tableHead: Array<string>
    
    constructor(props: Props) {
        super(props)
        // TODO 这个是造的数据
        // this.jsonData = '{"arr": [{"loginname":"gyf", "role": "管理员", "truename": "郭月飞"}, {"loginname":"tam", "role": "管理员", "truename": "天安门"}]}';
        this.state = {
            modalShow: false,
            jsonData: '{"arr": [{"loginname":"gyf", "role": "管理员", "truename": "郭月飞"}, {"loginname":"tam", "role": "管理员", "truename": "天安门"}]}',
        }

        this.tableHead = ["开票人登录名", "角色", "姓名"]

        // THINK 父组件在刷新的时候会重建子组件，组件在自我刷新的时候，只执行render函数并仅刷新已改变的值
        // this.adddrainfo = JSON.parse(JSON.stringify(this.props.adddrainfo))

        this.increase = []
        
        // modal ok按钮props
        this.confirm = {
            name: "OK",
            fun: () => {
                let info = this.props.adddrainfo
                let user = {
                    [info.loginname.name]: info.loginname.value,
                    [info.role.name]: info.role.value,
                    [info.truename.name]: info.truename.value, 
                    // [info.loginpasswd.name]: info.loginpasswd.value
                }
                
                let state = this.state
                let jsonData = JSON.parse(state.jsonData)
                jsonData.arr.push(user)
                state.jsonData = JSON.stringify(jsonData)
                // console.log(state)
                this.setState(state)

                user[info.loginpasswd.name] = info.loginpasswd.value
                // todo  保存数据，这是将来有用的 特别是数据库录入的时候   
                this.increase.push(user)
                // TODO 将改变的数据传递到父组件, 接下来父组件应该去做些事情
                this.props.getresult(this.increase)
            }
        }
    }

    // 删除应要添加的用户信息 这个函数是用click的，所以得根据参数返回一个无参函数
    delete = (loginname: string) => {
        

        return () => {
            console.log(this.increase)
            this.increase.forEach((value, index, increase) => {
                // TODO 初始化的时候应该只有increase列表里的才能删除
                // console.log("jinlaile ", value.loginname, loginname)
                value.loginname === loginname && increase.splice(index, 1)
            })
            let state = this.state
            let jsonData = JSON.parse(state.jsonData)
            jsonData.arr.forEach((value, index, arr) => {
                value.loginname === loginname && arr.splice(index, 1)
            })
            state.jsonData = JSON.stringify(jsonData)
            this.setState(state)
        }
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false } );
        return(
            <div>
                <ADTable delete={this.delete} tableHead={this.tableHead} json={this.state.jsonData}/>
                <ADModal onHide={modalClose} confirm={this.confirm} show={this.state.modalShow} title={"增加开票人"} mbody={<AdddraForm {...this.props}/>}/>
                <ButtonToolbar>
                    <Button
                        className="ml-2 mr-4"
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                        >
                        增加开票人
                    </Button>
                    {/* <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    /> */}
                </ButtonToolbar>
            </div>
        )
    }
}

type TYPETable = {delete?: Function, tableHead: Array<string>, json: string}
// ps. json格式 {arr: Array<>}

// table主体
// 4.2 统一表格，大大提高复用性 思考： 表单也可以实现高复用
class ADTable extends Component<Props> {

    renderTbody: Function

    constructor(props) {
        super(props)
        this.renderTbody = this.renderTbody.bind(this)
    }

    // 生成tbody
    // json {arr: [{loginname:xxx, role: xxx, name: xxx}]}
    renderTbody(json: string) {
        // console.log(json)
        let obs = JSON.parse(json).arr;
        // console.log(obs)
        const trs = obs.map((ob, index) => {
            let obToArr: Array<any> = Object.values(ob)
            return (
                <tr key={index}>
                    <td>{index}</td>
                    {
                        obToArr.map((value, index) => 
                            <td key={index}>{value}</td>
                        )
                    }
                    {this.props.delete && <td><Button onClick={this.props.delete(ob.loginname)}>删除</Button></td>}
                </tr>
            )
        })
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
                    {this.props.tableHead.map((value, index) => 
                        <th key={index}>{value}</th>
                    )}
                    {this.props.delete && <th>操作</th>}
                    </tr>
                </thead>
                {this.renderTbody(this.props.json)}
            </Table>
        )
    }
}

// TODO 增加开票人的模态框 当然这个模态框可以运用于其他地方
// 这里只提供一个模态框，但是Body内容有参数生成
class ADModal extends Component<Props> {

    state: any
    setState: any
    // TODO 模态框暂时只接受一个组件类型填充body内容，以后要有自定义各种配置
    constructor(props: {mbody: Component<any>}) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        
        return (
            <div>
                <Modal
                // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // show = {this.props.modalShow}
                    // onHide = {this.props.modalClose}
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.mbody}
                    </Modal.Body>
                    <Modal.Footer>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                    {
                        this.props.confirm && 
                        <ButtonGroup className="mr-2" aria-label="First group">
                            <Button onClick={this.props.confirm.fun}>{this.props.confirm.name}</Button>
                        </ButtonGroup>
                    }
                    <ButtonGroup className="mr-2" aria-label="Third group">
                        {/* THINK 可以通过向子组件传递函数来让子组件有改变父组件的能力 */}
                        <Button onClick={this.props.onHide}>Close</Button>
                    </ButtonGroup>
                    </ButtonToolbar>
                    </Modal.Footer>
                </Modal>

            </div>
        );
      }
}

// TODO 增加开票人or修改开票人表单
// {type?: string, title: string, name?: string, tip?: string, value: string, handerChange?: Function}
// props {title:xxx, values:[{value:xxx, name:xxx}, ...], handerChange: function(e) }
class AdddraForm extends Component<Props> {

    adddrainfo: Object
    // state: Object
    constructor(props) {
        super(props)
        // THINK 输入控制能否让组件自我控制呢，然后父组件仅需要传入一个获取值的函数 ：？：？：？ 应该是可以的  ///////事实证明是不可以的，除非暴露ref
        this.adddrainfo = this.props.adddrainfo;
    }

    render() {
        return (
            <div>
                <MyInput {...this.adddrainfo.loginname} />
                <MyInput {...this.adddrainfo.truename} />
                <MySelect {...this.adddrainfo.role} />
                <MyInput {...this.adddrainfo.loginpasswd} />
            </div>
        )
    }
}

// TODO 第四个页面 期初数据录入
class DataInit extends Component<Props> {
    jsonData: string
    tableHead: Array<string>
    setState: Function
    state: any

    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }

        this.jsonData = '{"arr": [{"invoiceCode":"123456", "begin": "0000", "end":"0100", "number": "100"}]}';
        this.tableHead = ["发票代码", "开始号码", "截至号码", "份数"]
    }


    render() {
        let modalClose = () => this.setState({ modalShow: false } );
        return (
            <div>
                <ADTable tableHead={this.tableHead} json={this.jsonData} />
                <ADModal onHide={modalClose} show={this.state.modalShow} title="增加记录" mbody={<MyForm info={this.props.dataInitInfo}/>}/>
                <ButtonToolbar>
                    <Button
                        className="ml-2 mr-4"
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                        >
                        增加记录
                    </Button>
                    {/* <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    /> */}
                </ButtonToolbar>
            </div>
        )
    }
}

//                  invoiceCode: {title:"发票代码", name: "invoiceCode", value: "", tip: "", handerChange: (e)=>{} },
//                 begin: {title:"开始号码", name: "begin", value: "", tip: "", handerChange: (e)=>{} },
//                 end: {title: "截至号码", name: "end", value: "", tip:"", handerChange: (e)=>{} },
//                 date: {title: "购票日期", name: "date", value: "", tip: "", handerChange: (e)=>{} }

// 先定义props的格式
type MyFormProps = {info: Array<TypeAllPutProps>}

// TODO 打算写一个通用表单 由于前面已经有专用表单存在，所以可能不会进行代码的统一
// 在第四个页面后的所有表单都使用通用表单 参数类型如上定义
// 而在Win组件中，对象集合应该变成对象数组集合 （方便）
class MyForm extends Component<MyFormProps> {

    render() {

        return (
            <div>
                {this.props.info.map((value, index, arr) => 
                    <AllPut key={index} {...value} />
                )}
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
    stateAttrs: string[];
    adddrainfos: Array<any>

    constructor(props:any) {
        super(props);
        // this.bsets = [
        //     {value: "Next", handerClick: this.handerClickNext, disabled: false},
        //     {value: "Cancel", handerClick: this.handerClick1, disabled: false}
        // ]
        this.stateAttrs = [
            'baseinfo',
            'adddrainfo',
            'dataInitInfo'
        ]
        
        this.state = {

            bsets: [
                {value: "Next", handerClick: this.handerClickNext, disabled: false},
                {value: "Cancel", handerClick: this.handerClick1, disabled: false} 
            ],
            
            //Baseinfo
            [this.stateAttrs[0]]: {
                // name: this.stateAttrs[0],
                taxpayerName: {name: "taxpayerName", value: "", tip: "", handerChange: this.handerChange("baseinfo.taxpayerName")},
                taxpayerID: {name: "taxpayerID", value: "", tip:"", handerChange: this.handerChange("baseinfo.taxpayerID")},
                category: {name: "category", value: '1', values:[{name: "1", value: "1"},{name: "2", value: "2"}], handerChange: this.handerChange("baseinfo.category")},
                billintype: {name: "billintype", value: '2', values:[{name: "2", value: "2"},{name: "3", value: "3"}], handerChange: this.handerChange("baseinfo.billintype")} 
            },

            //Adddrawer
            adddrainfo: {
                // name: "adddrainfo",
                loginname: {title: "登陆名", name: "loginname", value: "", tip: "", handerChange: this.handerChange("adddrainfo.loginname")},
                truename: {title: "姓名", name: "truename", value: "", tip: "", handerChange: this.handerChange("adddrainfo.truename")},
                role: {title: "角色", name: "role", value: '1', values: [{value: '1', name: '1'}, {value: '2', name: '2'}], handerChange: this.handerChange("adddrainfo.role")},
                loginpasswd: {type: "password", title: "登陆密码", name: "loginpasswd", value: "", tip: "", handerChange: this.handerChange("adddrainfo.loginpasswd")},
            },

            // 从第四个页面开始使用更加抽象的自定义表单，表格和modal
            [this.stateAttrs[2]]: [
                // name: this.stateAttrs[2],
                {title:"发票代码", name: "invoiceCode", value: "", tip: "", handerChange: (e)=>{} },
                {title:"开始号码", name: "begin", value: "", tip: "", handerChange: (e)=>{} },
                {title: "截至号码", name: "end", value: "", tip:"", handerChange: (e)=>{} },
                {title: "购票日期", name: "date", value: "", tip: "", handerChange: (e)=>{} }
            ],
            

            /******************* */

            // main: this.mains[0], 
            mainCounter: 0,
            // buttons: <Buttons bsets={this.state.bsets} />
        }
        //用这个数组去存取第三页面添加的全部用户属性
        this.adddrainfos=[];
    }


    // 传入第三页面获取做出改变的数据
    addDrainfo = (result: Array<any>) => {
        this.adddrainfos.push(...result)
    }

    // props里应该也有一个change的函数提供，但是那个函数只能取值，所有的值约束，改变什么的都应该由本函数返回的函数实现。
    // THINK 前期第二个页面我设计的是全由最外层组件完成，现在想想外层父组件会变得庞大。所以重新进行责任划分，将由子组件完成的工作仍然有子组件完成
    // 3.28 合并函数，减少代码量
    // handerChange1 = (infokey: string) => {

    //     let limit: Function = (str: string) => {
    //         let patt: RegExp;
    //         let info = this.state.adddrainfo;
    //         let message = "";
    //         switch(infokey) {
    //             case info.truename.name:
    //                 patt = /^[\u4e00-\u9fa5]{2,12}$/;
    //                 message = patt.test(str) ? "" : "姓名应为2-12个中文字符";
    //                 break;
    //             case info.loginname.name:
    //                 patt = /^[\w]{2,}$/;   
    //                 message = patt.test(str) ? "" : "登陆名应为大于2个普通字符";
    //                 break;
    //             case info.loginpasswd.name:
    //                 patt = /^.{8,20}$/;
    //                 message = patt.test(str) ? "" : "密码应为8-20位字符"
    //                 break;
    //             default:
    //                 message = "error";
    //         }
    //         return message;
    //     }


    //     // 返回一个检测change的函数
    //     return (e: Event) => {
    //         let info: any = this.state.adddrainfo;
    //         let target: any = e.target;
    //         let value: string = target.value;
    //         info[infokey].value = value;

    //         info[infokey].tip = limit(value);

    //         // todo ？？？？从父组件中传入方法 怎么把数据传出到父组件呢？？？   事实证明，react的数据流只能向下流动，果断放弃
     

    //         // 从这里更加可知，这个函数不过是为了通知react进行刷新而已
    //         this.setState(this.state);
    //     }
    // }



    // 动态构造所需函数，减少代码量 
    handerChange = (attr: string) => {

        //分析参数
        let attrs = attr.split('.')

        // todo 这里应该对输入的内容做限制 限制函数可以写在这个函数里面
        // TODO 新加todo，可能将来需要返回这个函数，这时候应该在外面再写一个函数，并返回这个函数
        let limit: Function = (str: string) => {
            let patt: RegExp;
            let message: string;
            let info = this.state[attrs[0]]
            switch (attrs[1]) {
                case info.taxpayerName&&info.taxpayerName.name:
                    // 纳税人名称 ^[\u4e00-\u9fa5]{2,12}$ 中文吧，应该不会超过12个字了吧
                    patt = /^[\u4e00-\u9fa5]{2,12}$/;
                    message = patt.test(str) ? "" : "纳税人姓名应为2-12个中文字符"
                    break;
                case info.taxpayerID&&info.taxpayerID.name:
                    // 纳税人识别码 数字15、18、20位
                    patt = /^[0-9]{15}$|^[0-9]{18}$|^[0-9]{20}$/;
                    message = patt.test(str) ? "" : "纳税人识别码应为15、18或者20位数字";
                    break;
                case info.truename&&info.truename.name:
                    patt = /^[\u4e00-\u9fa5]{2,12}$/;
                    message = patt.test(str) ? "" : "姓名应为2-12个中文字符";
                    break;
                case info.loginname&&info.loginname.name:
                    patt = /^[\w]{2,}$/;   
                    message = patt.test(str) ? "" : "登陆名应为大于2个普通字符";
                    break;
                case info.loginpasswd&&info.loginpasswd.name:
                    patt = /^.{8,24}$/;
                    message = patt.test(str) ? "" : "密码应为8-24位字符"
                    break;
                default: return "";
            }
            return message;
        }


        // 返回一个handerChange的函数
        return (e: Event) => {
            const target: any = e.target;
            const value: string = target.value;
            // let alter = {value: value, tip: limit(value)}
            let info = this.state[attrs[0]];
            info[attrs[1]].value = value;
            info[attrs[1]].tip = limit(value)
            // this.bsets[0].disabled = !alter.tip  
            let bsets = this.state.bsets;   
 
            // 注意这个函数不是深拷贝
            // const att = Object.assign({}, this.state.baseinfo[attr], alter)     //对select记录值，对input更新并记录值

            // fixme 有问题，当一个输入框满足条件后就将按钮置可用 
            // 解决方案，先将tip更新入state，然后查询baseinfo的两个属性的tip，设定bsets，然后再更新一次。  react本身用的就是虚拟DOM，所以效率差不了多少
            // ps: 在写解决方案的时候发现优化方法 在setState之前就已经在本地拿到state.baseinfo了，直接做判定
            // THINK 为什么我没将bset重新setState也能成 ？：？：？：那是因为我拿到的是引用不是内存复制，其实就是对state中bsets数组 ： by solomon
            info.taxpayerName && info.taxpayerID && (bsets[0].disabled = (!info.taxpayerName.value || !info.taxpayerID.value) || (info.taxpayerName.tip || info.taxpayerID.tip) ? true : false)

            // console.log(this.state)

            this.setState(this.state)

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
            <BaseInfo info={this.state.baseinfo} />,
            <Adddrawer getresult={this.addDrainfo} adddrainfo={this.state.adddrainfo}/>
        ]

        // TODO 将来完成后需要改，路由逻辑上要优化
        const main = mains[this.state.mainCounter>=mains.length?mains.length-1:this.state.mainCounter]
        // const main = this.mains[this.state.mainCounter]
        return (
            <Container>
                {main}
                {/* <BaseInfo info={this.state.baseinfo} /> */}
                {/* {this.state.buttons} */}
                <Adddrawer getresult={this.addDrainfo} adddrainfo={this.state.adddrainfo}/>
                <DataInit dataInitInfo={this.state.dataInitInfo} />
                <Buttons bsets={this.state.bsets}/>
            </Container>
        )
    }
}


