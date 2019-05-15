// @flow
import React, {Component} from 'react'
import { Row, Col, Radio, Table } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import moment from 'moment';

import { Frame } from '../../components/frame'

import type { FrameProps } from '../../components/frame'



// 这个类型其实可以从 Frame 所在文件导出
// type FrameProps = {
//     title: string,
//     control?: {
//         RadioGroup?: {
//             onChange: Function,
//             value: string,
//             content: Array<{value: string, name: string}>
//         }
//     },
//     infoTotal: React$Element<any>,
//     infoView: React$Element<any>,
// }

type TodayProps = {}

type TodayTableProps = {}


export class Today extends Component<TodayProps> {
    state: any
    info: FrameProps

    constructor(props: TodayProps) {
        super(props)
        this.state = {
            
        }
        this.info = {
            title: "当日开票",
            control: {
                RadioGroup:{
                    onChange: () => {},
                    value: "1",
                    content: [
                        {value: '1', name: '全部'},
                        {value: '2', name: '正常票'},
                        {value: '3', name: '废票'},
                        {value: '4', name: '退票'}
                    ]
                }
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
        dataSource?: Array<{
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


