/**
* @description 展示页面的整体框架 
* @author Solomon
* @license MIT
* @created 2019-05-15T19:20:02 Z+08:00
* @last_modified 2019-05-20T10:31:48 Z+08:00
* 
* @flow 
*/
 
import React, {Component} from 'react';
import { Row, Col, Radio, Button } from 'antd';
import RadioGroup from 'antd/lib/radio/group';

export type CRGProps = {
    order?: number,
    onChange: (e: Event) => void,
    value: string,
    content: Array<{value: string, name: string}>
}

export type CBProps = {
    // TODO 这是为了之后组件排序
    order?: number, 
    // 这里我认为，该类型在嵌套的上级内容中出现CBProps类型，那么就应该存在Button需要渲染
    content: Array<{
        name: string,
        type?: string,
        icon?: string,
        shape?: string,
        onClick?: ()=>void,
        size?: string,
        ghost?: boolean,
    }>
}

export type ControlProps = {
    
    radioGroup?: CRGProps,

    buttons?: CBProps,
}

export type FrameProps = {
    title: string,
    controls?: ControlProps,
    infoTotal?: React$Element<any>,
    infoView: React$Element<any>,
}

export class Frame extends Component<FrameProps> {



    render() {
        let Infomation: React$Element<any>|null = this.props.infoTotal ? this.props.infoTotal : null
        let View: React$Element<any> = this.props.infoView
        return (
            <Row>
                <Row>
                    <Col style={{ fontSize: '25px', fontWeight: 'bold' }}>{this.props.title}</Col>
                </Row>

                {
                    // 这一部分彻底交给Controler管理
                    this.props.controls && 
                    <Controler {...this.props.controls} />
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


type controlItem = {
    order: number,
    content: React$Element<any>
}

type controlsType = Array<controlItem>

/**
 * TODO 一个复杂的逻辑
 * 如果各传入组件的props中有order属性，那么按order排序显示
 * 如果有的有，有的没有order属性，那么就没有的排最前面，其他按顺序排
 */
class Controler extends Component<ControlProps> {

    
    controls: controlsType

    constructor(props: ControlProps) {
        super(props)
        this.controls = []

        // THINK 下面的能不能减少代码量
        this.props.radioGroup&& (
            this.controls.push({
                order: this.props.radioGroup.order||0, 
                content: <ControlRadioGroup {...this.props.radioGroup} key={this.controls.length}/>
            })
        )

        this.props.buttons&& (
            this.controls.push({
                order: this.props.buttons.order||0,
                content: <ControlButtions {...this.props.buttons} key={this.controls.length}/>
            })
        )
        
        this.controls.sort((a: controlItem, b: controlItem) => a.order - b.order)

    }

    
    render() {
        return (
            <div>
                {
                    this.controls.map((v, i, a) => (
                        v.content
                    ))
                }
            </div>
        )
    }
}

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


export class ControlButtions extends Component<CBProps> {

    // constructor(props: CBProps) {
    //     super(props)
    
    // }

    render() {

        return (
            <div>
                {
                    this.props.content.map((v, i, a) => (
                        <Button {...v} key={i}>{v.name}</Button>
                    ))
                }
            </div>
        )
    }
}

// TODO 还需要一个下拉列表

export type CSProps = {

}

export class ControlSelects extends Component<CSProps> {


    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

