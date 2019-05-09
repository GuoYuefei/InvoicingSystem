// @flow
import React, {Component} from 'react'
import {Navantd} from './navant'
import { Row, Col } from 'antd';
import { Buttons } from './buttons';
import ContentIndex, { Today } from './contents/index'
import type {dataSource as TypeNavDataSource} from './navant'
import type {dataSource as TypeButtionDataSource} from './buttons'
import { Router, Route, Switch } from 'dva/router';

type Props = {history?: History}

export class MainWin extends Component<Props> {

    navDataSource: TypeNavDataSource
    buttonDataSource: TypeButtionDataSource
    state: any

    constructor(props: Props) {
        super(props)

        this.state = {
            indexData: {}
        }
       
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
                {name: "当日开票", icon: "", link: "today"},
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
                <Row type="flex" justify="center" style={{paddingTop:8}}>
                    <Col>
                        <span>eTax@SH 电脑开票-上海市统一票样开票系统</span>
                    </Col>
                </Row>
                <Row style={{paddingTop: 8}}>
                    <Col>
                        <Buttons dataSource={this.buttonDataSource} />
                    </Col>
                </Row>
                <Row gutter={64} style={{paddingTop: 24}} >
                    <Col xxl={3} xl={4} lg={6} md={7} sm={8} xm={11}>
                        <Navantd dataSource={this.navDataSource} />
                    </Col>
                    <Col xxl={20} xl={19} lg={17} md={16} sm={15} xm={12}>
                        <Router history={this.props.history}>
                            <Switch>
                                <Route path="/" exact component={ContentIndex} />
                                <Route path="/today" exact component={Today} />
                            </Switch>
                        </Router>
                        {/* <ContentIndex/> */}
                    </Col>
                </Row>
            </div>

        )
    }
}