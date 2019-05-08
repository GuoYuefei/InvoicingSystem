// @flow
import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Col, Row, Avatar } from "antd";
import moment from 'moment';
import {Today} from './today'
import request from '../../utils/request';


// type Props = {
//     dataSource: any
// }
type Props = {
    
}

type TotalDataType = {
    score: string,
    amount: number,
    invalidatedTicket: number,
    refund: number,
    refundAmount: number,
}

type State = {
    today: TotalDataType,
    thisMonth: TotalDataType,
    lastMonth: TotalDataType,
    last3Month: TotalDataType,
}

class ContentIndex extends Component<Props, State> {

    setState: Function

    constructor(props: Props) {
        super(props)
        this.state = {
            today: {},
            thisMonth: {},
            lastMonth: {},
            last3Month: {},
        }
    }

    componentDidMount() {

        // fetch
        let test = request("http://127.0.0.1:8080/today/test")
        test.then(data=>{
            let state = this.state
            state.today = data.data
            state.thisMonth = data.data
            state.lastMonth = data.data
            state.last3Month = data.data
            this.setState(state)
            console.log(state)
        })
        

    }



    render() {

        // FLOW 这种写法可以继承类型，无需重复声明静态类型
        const {today,thisMonth, lastMonth, last3Month} = this.state

        return (
            <div >
                <Row style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                    
                    <Col span={6}>
                        <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Col>
                    
                    <Col span={12} >

                        <Row >
                            <Col>张三</Col>
                            <Col>
                                <a href="#"><span>更换头像</span></a>|
                                <a href="#"><span>删除头像</span></a>
                            </Col>
                            <Col>310103182727363</Col>
                            <Col>上海计算机有限公司</Col>
                        </Row>
                    </Col>
                    
                    <Col span={6} >

                        <Row>
                            <Col>电脑日期：{moment().format('YYYY-MM-DD')}</Col>
                            <Col>电脑时间：{moment().format('HH:mm:ss')}</Col>
                            <Col><span style={{ fontSize: 10, color: 'black' }}>务必校准电脑日期和时间，保证正确开票</span></Col>
                        </Row>
                    </Col>
                </Row>
                
                <DividingLine marginTop='5px' marginBottom="10px"/>

                <Row>
                    <Col><span>当前月度：<span style={{ fontSize: 18, fontWeight: 'bold' }}>{moment().format('YYYY年MM月')}</span></span></Col>
                </Row>

                {
                /**
                    +-----+------+---------+
                    |     |      |         |
                    +-----+------+         +
                    |     |      |         |
                    +-----+------+---------+
                 */
                }

                <Row  type='flex' justify='space-between'>
                    <Col >
                        <Row style={{padding: 8}}>
                            <Row><span>当日</span></Row>
                            <DividingLine/>
                            {/* <Row><span>正常分数：</span>{today.score||''}</Row>
                            <Row><span>正常票金额：</span>{today.amount||0}</Row>
                            <Row><span>废票份额：</span>{today.invalidatedTicket||0}</Row>
                            <Row><span>退票份额：</span>{today.refund||0}</Row>
                            <Row><span>退票金额：</span>{today.refundAmount||0}</Row> */}
                            <TotalData {...today}/>
                        </Row>
                        <Row style={{padding: 8}}>
                            <Row><span>当月</span></Row>
                            <DividingLine/>
                            <TotalData {...thisMonth} />
                        </Row>
                    </Col>

                    <Col >
                        <Row style={{padding: 8}}>
                            <Row><span>上月</span></Row>
                            <DividingLine/>
                            <TotalData {...lastMonth} />
                        </Row>
                        <Row style={{padding: 8}}>
                            <Row><span>三个月内</span></Row>
                            <DividingLine/>
                            <TotalData {...last3Month} />
                        </Row>
                    </Col>
                    
                    <Col>
                        <span>开票向导</span>
                        <DividingLine/>
                        <Row>
                            <Row>第1步：<a href="#">接收税务机关数据</a> 或 <a href="#">发票购票录入 </a></Row>
                            <Row>第2步：<a href="#">发票簿校验加锁</a></Row>
                            <Row>第3步：<a href="#">开票</a></Row>
                        </Row>
                    </Col>
                </Row>
       
                
                

            </div>
        )
    }
}

function TotalData(props) {
    let data:any = Object.values(props)
    let titles: Array<string> = ["正常分数：", "正常票金额：", "废票份额：", "退票份额：", "退票金额："]

    return (

        data.map((value, index) => (
            <Row key={index}><span>{titles[index]}</span>{value}</Row>))
    )
}



function DividingLine(props: {marginTop?: string, marginBottom?: string}) {
    return (
        <div style={{ border: 'solid', borderColor: '#CCDDEE', marginTop: props.marginTop||'0px', marginBottom: props.marginBottom||'0px' }} >

        </div>
    )
    
}


export  {ContentIndex, Today}
