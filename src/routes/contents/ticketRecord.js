/**
* @description 购票记录页面 
* @author Solomon
* @license MIT
* @created 2019-05-15T19:20:02 Z+08:00
* @last_modified 2019-05-22T20:05:34 Z+08:00
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

import obop from '../../utils/object';
import { MyForm } from '../../components/form';
import type { Props as FormData } from '../../components/form'

type Props = {}

type State = {
    modalData: {
        state: {
            loading: boolean,
            visible: boolean,
        }
    },
    
    
}

type TiRcdTableProps = {}

export class TicketRecord extends Component<Props, State> {

    info: FrameProps
    
    modal: React$Element<any>

    formData: FormData

    setState: Function
    formRefs: any

    modalData: {
        handleCancel: () => void,
        handleOk: () => void,
        contents: Array<React$Element<any>>
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            // modal的动态属性
            modalData: {
                state: {
                    loading: false,        
                    visible: false,
                },
                
            },
            
        }

        // form的属性
        this.formData = {
            handleSubmit: (e, validateFields) => {
                e.preventDefault();
                validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            dataSource: [
                {
                    id: "invoice_code",
                    options: {
                        rules: [{ required: true, message: 'Please input Invoice code!' }],
                    },
                    dataSource: {
                        placeholder: "Invoice Code"
                    }
                },
                {
                    id: "begin",
                    options: {
                        rules: [{required: true, message: 'Please input begining nummber!'}]
                    },
                    dataSource: {
                        placeholder: "Begining Number"
                    }
                },
                {
                    id: "end",
                    options: {
                        rules: [{required: true, message: 'Please input ending nummber!'}],
                    },
                    dataSource: {
                        placeholder: "Ending Number"
                    }
                },
                {
                    id: "date",
                    options: {
                        rules: [{required: true, message: "Please input date"}]
                    },
                    dataSource: {
                        type: "date"
                    }
                }
                
            ],
        }

        // 框架属性
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
                                this.setState(obop.assign(this.state, "modalData.state.visible", true))
                            },
                        }
                    ]
                },
                
            },
            infoTotal:<div></div>,
            infoView: <TiRcdTable />
        }

        // modal和form联动需要的refs
        this.formRefs = React.createRef()

        // modal的静态属性
        this.modalData = {
            handleCancel: () => {
                this.setState(obop.assign(this.state, "modalData.state.visible", false))
            },

            handleOk: () => {
                // TODO 标志下CONSOLE          检查字段
                // console.log(this.formRefs)
                // this.formRefs.current.submit();
                this.formRefs.current.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        // console.log(values.date._d.toLocaleDateString())
                    }
                });
                // THINK 是不是应该延时推出的 question 以后解决
                this.setState(obop.assign(this.state, "modalData.state.visible", false))
            },
            
            contents: [
                <MyForm {...this.formData} ref={this.formRefs} key="myform" />            //modal需要一个refs来实现对form的控制
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

// table页面
class TiRcdTable extends Component<TiRcdTableProps, any> {

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

        this.state = {
            data: {
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
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Table {...this.state.data} />
        )
    }
}


