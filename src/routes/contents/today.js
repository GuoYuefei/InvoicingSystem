// @flow
import React, {Component} from 'react'
import { Row, Col, Radio, Table } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import moment from 'moment';

type FrameProps = {
    title: String,
    control: {
        onChange: Function,
        value: string,
        content: Array<{value: string, name: string}>
    },
    infoTotal: any,
    infoView: any
}

type TodayProps = any

type TodayTableProps = any


export class Today extends Component<TodayProps> {
    state: any
    info: any

    constructor(props: TodayProps) {
        super(props)
        this.state = {
            
        }
        this.info = {
            title: "当日开票",
            control: {
                onChange: () => {},
                value: "1",
                content: [
                    {value: '1', name: '全部'},
                    {value: '2', name: '正常票'},
                    {value: '3', name: '废票'},
                    {value: '4', name: '退票'}
                ]
            },
            infoTotal: <span>暂时</span>,
            infoView: <TodayTable />,
        }
    }




    render () {
        return (
            <div>
                <Frame {...this.info} />
            </div>
        )
    }
}

class TodayTable extends Component<TodayTableProps> {
    data: {
        columns: Array<{
            title:string, dataIndex: string, key: string
        }>,
        dataSource: Array<{
            key: string, 
            num: number, 
            invoiceCode: string,
            invoiceNum: string,
            amount: number,
            time: string,
            drawee: string,
            TCCode: string,
            printTimes: number,
            invoiceType: string
        }>
    }

    constructor(props: TodayTableProps) {
        super(props)
        this.data = {
            columns: [
                {title: '行号', dataIndex: 'num', key: 'name'},
                {title: '发票代码', dataIndex: 'invoiceCode', key: 'invoiceCode'},
                {title: '发票号码', dataIndex: 'invoiceNum', key: 'invoiceNum'},
                {title: '金额', dataIndex: 'amount', key: 'amount'},
                {title: '开票时间', dataIndex: 'time', key: 'time'},
                {title: '付款人', dataIndex: 'drawee', key: 'drawee'}, 
                {title: '税控码', dataIndex: 'TCCode', key: 'TCCode'},
                {title: '打印次数', dataIndex: 'printTimes', key: 'printTimes'},
                {title: '开票类型', dataIndex: 'invoiceType', key: 'invoiceType'}   
            ],
            //TODO 来源api
            dataSource: [
                {
                    key: '1',
                    num: 1,
                    invoiceCode: '3333333',
                    invoiceNum: '12321312',
                    amount: 33322.22,
                    time: moment().format('YYYY-MM-DD'),
                    drawee: '某某某',
                    TCCode: '32',
                    printTimes: 2,
                    invoiceType: '企业'
                }
            ]
        }
    }


    render() {

        return (
            <div>
                <Table {...this.data} />
            </div>
        )
    }
}






class Frame extends Component<FrameProps> {




    render() {
        let Infomation: any = this.props.infoTotal
        let View: any = this.props.infoView
        return (
            <Row>
                <Row>
                    <Col style={{ fontSize: '25px', fontWeight: 'bold' }}>{this.props.title}</Col>
                </Row>
                <Row>
                    <Col>
                        <RadioGroup onChnage={this.props.control.onChange} value={this.props.control.value}>
                            {
                                this.props.control.content.map((value, index, arr)=>(
                                    <Radio value={value.value} key={index}>{value.name}</Radio>
                                ))
                            }
                        </RadioGroup>
                    </Col>
                </Row>
                {
                    // TODO 下面两个感觉可以合成一个。还有上面一个也会和数据相关，看情况合并
                }
                <Row>
                    <Col>
                        {Infomation}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {View}
                    </Col>
                </Row>
            </Row>
        )
    }
}


