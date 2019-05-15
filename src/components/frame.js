/**
 * 展示页面的框架Component
 * @author solomon
 * @license MIT
 * @flow
 */
import React, {Component} from 'react';
import { Row, Col, Radio } from 'antd';
import RadioGroup from 'antd/lib/radio/group';

type CRGProps = {
    onChange: Function,
    value: string,
    content: Array<{value: string, name: string}>
}

export type FrameProps = {
    title: string,
    control?: {

        RadioGroup?: CRGProps,

        
    },
    infoTotal: React$Element<any>,
    infoView: React$Element<any>,
}

export class Frame extends Component<FrameProps> {




    render() {
        let Infomation: React$Element<any> = this.props.infoTotal
        let View: React$Element<any> = this.props.infoView
        return (
            <Row>
                <Row>
                    <Col style={{ fontSize: '25px', fontWeight: 'bold' }}>{this.props.title}</Col>
                </Row>

                {
                    // 只有this.props.control有才渲染，bingo
                    this.props.control&&
                    this.props.control.RadioGroup&&
                    <ControlRadioGroup {...this.props.control.RadioGroup} />

                }
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



// TODO 这个可能会对table影响
export class ControlRadioGroup extends Component<CRGProps> {

    // constructor(props: CRGProps) {
    //     super(props)
    // }

    render() {
        return (
            <RadioGroup onchange={this.props.onChange} value={this.props.value} >
                {
                    this.props.content.map((value, index, arr) => (
                        <Radio value={value.value} key={index}>{value.name}</Radio>
                    ))
                }
            </RadioGroup>
        )
    }
}

