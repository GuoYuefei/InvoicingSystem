// @flow
import React, { Component } from "react";
import { Button, Row, Col } from "antd";

export type dataSource = Array<{
    name:string,
    icon?:string
}>

type Props = {
    dataSource: dataSource
}

// 按钮组
export class Buttons extends Component<Props> {


    render() {
        return (
            <div>
                <Row gutter={16} style={{ display: 'flex', justify: 'start' }}>
                        
                        {
                            this.props.dataSource.map((value, index, arr) => (
                                <Col key={index}>
                                    <Button icon={value.icon}>{value.name}</Button>
                                </Col>
                            ))
                        }


                        {/* <Col>
                            <Button icon="printer">开票</Button>
                        </Col>
                        <Col>
                            <Button icon="printer">发票作废</Button>
                        </Col>
                        <Col>
                            <Button icon="printer">开退票</Button>
                        </Col>
                        <Col>
                            <Button icon="printer">重打发票</Button>
                        </Col>
                        <Col>
                            <Button icon="printer">打印表格</Button>
                        </Col>
                        <Col>
                            <Button icon="printer">输出为Excel</Button>
                        </Col>
                        <Col><Button icon="printer">查找</Button></Col>
                        <Col><Button icon="user" >登陆</Button></Col> */}
                    </Row>

            </div>
        )
    }
}