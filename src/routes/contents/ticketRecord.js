/**
* @description 购票记录页面 
* @author Solomon
* @license MIT
* @created 2019-05-15T19:20:02 Z+08:00
* @last_modified 2019-05-21T15:36:19 Z+08:00
* 
* @flow 
*/

import React, { Component } from 'react'
import type { FrameProps } from '../../components/frame'

import { Frame } from '../../components/frame';
import moment from 'moment';
import { Table } from 'antd';
import { MyModal } from '../../components/modal';
import type { Props as ModalData } from '../../components/modal';

import { assign } from '../../utils/object';

type Props = {}

type State = {
    modalData: {
        state: {
            loading: boolean,
            visible: boolean,
        }
    }
}

type TiRcdTableProps = {}

export class TicketRecord extends Component<Props, State> {

    info: FrameProps
    
    modal: React$Element<any>

    setState: Function

    modalData: {
        handleCancel: () => void,
        handleOk: () => void,
        contents: Array<React$Element<any>>
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            modalData: {
                state: {
                    loading: false,        
                    visible: false,
                },
                
            }
        }

        this.info = {
            title: "购票记录",
            controls: {

                buttons: {
                    order: 0,
                    content: [
                        {
                            name: "增加购票记录",
                            icon: "plus",
                            onClick: ()=>{
                                this.setState(assign(this.state, "modalData.state", {
                                    loading: false,        
                                    visible: true,
                                }))
                            },
                        }
                    ]
                },
                
            },
            infoTotal:<div></div>,
            infoView: <TiRcdTable />
        }

        this.modalData = {
            handleCancel: () => {
                this.setState({
                    ...this.state,
                    modalData: {
                        ...this.state.modalData,
                        state: {
                            loading: false,
                            visible: false,
                        }
                    }
                })
            },

            handleOk: () => {

            },
            
            contents: [
                
            ]
        }

    }

    render() {

        let modalData: ModalData = {
            ...this.state.modalData,
            ...this.modalData
        }

        let modal = <MyModal 
            {...modalData}
        />

        let info = {
            ...this.info,
            infoTotal: modal
        }


        return (
            <Frame {...info}/>
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


