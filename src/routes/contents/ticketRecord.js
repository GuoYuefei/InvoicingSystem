/**
* @description 购票记录页面 
* @author Solomon
* @license MIT
* @created 2019-05-15T19:20:02 Z+08:00
* @last_modified 2019-05-20T10:30:25 Z+08:00
* 
* @flow 
*/

import React, { Component } from 'react'
import type { FrameProps } from '../../components/frame'

import { Frame } from '../../components/frame';
import moment from 'moment';
import { Table } from 'antd';





type Props = {}

type TiRcdTableProps = {}

export class TicketRecord extends Component<Props> {

    info: FrameProps

    constructor(props: Props) {
        super(props)
        this.info = {
            title: "购票记录",
            controls: {

                buttons: {
                    order: 0,
                    content: [
                        {
                            name: "增加购票记录",
                            icon: "plus",
                            // onClick: ()=>{},
                        }
                    ]
                },
                
            },
            infoTotal:<div></div>,
            infoView: <TiRcdTable />
        }
    }

    render() {
        return (
            <Frame {...this.info}/>
        )
    }
}



class TiRcdTable extends Component<TiRcdTableProps> {

    data: {
        columns: Array<{
            title:string, dataIndex: string, key: string
        }>,
        data?: Array<{
            key: string, 
            ticketDate: string,
            invoiceCode: string,
            codeBegin: string,
            codeEnd: string,
            num: number,
            state: string,

        }>
    }

    constructor(props: TiRcdTableProps) {
        super(props)
        this.data = {
            columns: [
                {title: "购票日期", dataIndex: "ticketDate", key: "ticketDate"},
                {title: "发票代码", dataIndex: "invoiceCode", key: "invoiceCode"},
                {title: "开始号码", dataIndex: "codeBegin", key: "codeBegin"},
                {title: "截至号码", dataIndex: "codeEnd", key: "codeEnd"},
                {title: "份数", dataIndex: "num", key: "num"},
                {title: "状态", dataIndex: "state", key: "state"}
            ],
            // TODO 将来来源api
            dataSource: [
                {
                    key: "1",
                    ticketDate: moment().format('YYYY-MM-DD'),
                    invoiceCode: "12323123145",
                    codeBegin: "100000",
                    codeEnd: "100100",
                    num: 100,
                    state: "锁定"
                }
            ]
        }
    }

    render() {
        return (
            <Table {...this.data} />
        )
    }
}


