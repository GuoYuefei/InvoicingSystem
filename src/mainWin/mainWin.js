// @flow
import React, {Component} from 'react'
import {Navantd} from './navant'
import { Row, Col } from 'antd';
import { Buttons } from './buttons';
import type {dataSource as TypeNavDataSource} from './navant'
import type {dataSource as TypeButtionDataSource} from './buttons'

export class MainWin extends Component<any> {

    navDataSource: TypeNavDataSource
    buttonDataSource: TypeButtionDataSource


    constructor(props:any) {
        super(props)
       
        // TODO 所有逻辑功能写在这里
        this.buttonDataSource = [
            {name: "开票", icon: "printer"},
            {name: "发票作废", icon: "printer"},
            {name: "开退票", icon: "printer"},
            {name: "重打发票", icon: "printer"},
            {name: "打印表格", icon: "printer"},
            {name: "输出为Excel", icon: "printer"},
            {name: "查找", icon: "printer"},
            {name: "登陆", icon: "user"},
        ]

        this.navDataSource = [
            {name: "开票统计", icon: "pie-chart", items: [
                {name: "当日开票", icon: ""},
                {name: "本月开票", icon: ""},
                {name: "上月开票", icon: ""},
                {name: "三个月内开票", icon: ""},
                {name: "开票查询", icon: ""},
                {name: "开票统计", icon: ""},
            ]},
            {name: "退废票统计", icon: "delete", items: [
                {name: "退票记录"},
                {name: "作废发票"},
            ]},
            {name: "购存统计", icon: "shopping", items: [
                {name: "购票记录"},
                {name: "发票库存"},
            ]},
            {name: "其他统计", icon: "inbox", items: [
                {name: "遗失发票"},
                {name: "缴销发票"},
            ]},
            {name: "其他", icon: "tag", items: [
                {name: "收发记录"}, 
                {name: "货品或项目"}, 
                {name: "窗户"}, 
            ]},
        ]
    }

    render() {
        return (
            <div>
                <div style={{padding:6}}/>
                <Row type="flex" justify="center">
                    <Col>
                        <span>eTax@SH 电脑开票-上海市统一票样开票系统</span>
                    </Col>
                </Row>
                <div style={{padding:6}}/>
                <Row>
                    <Col>
                        <Buttons dataSource={this.buttonDataSource} />
                    </Col>
                </Row>
                <div style={{padding:12}} />
                <Row gutter={8}>
                    <Col span={3}>
                        <Navantd dataSource={this.navDataSource} />
                    </Col>
                    <Col>
                        content
                    </Col>
                </Row>
            </div>

        )
    }
}