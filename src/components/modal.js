/**
* @description 整体的模态框复用组件 
* @author Solomon
* @license MIT
* @created 2019-05-20T10:45:27 Z+08:00
* @last_modified 2019-05-21T11:26:42 Z+08:00
* 
* @flow
*/

import React, {Component} from 'react'
import {Button, Modal} from 'antd'

export type Props = {
    state: {
        loading: boolean,       // 确定按钮的状态
        visible: boolean,
    },
    handleOk: () => void,           // 这个可以在父组件下形成对contents中组件的控制，比如向服务器提交数据
    handleCancel: () => void,
    contents: Array<React$Element<any>>
}

class MyModal extends Component<Props> {

    
    // state = {
    //     loading: false,
    //     visible: false,
    // }

    // showModal = () => {
    //     this.setState({
    //         ...this.state, 
    //         visible: true,
    //     })
    // }
    
    // handleOk = () => {
    //     this.setState({
    //         ...this.state,
    //         loading: true
    //     })
    //     setTimeout(() => {
    //         this.setState({
    //             loading: false,
    //             visible: false
    //         })
    //     }, 2000)
    // }

    // handleCancel = () => {
    //     this.setState({
    //         ...this.state,
    //         visible: false
    //     })
    // }


    render() {
        const {visible, loading} = this.props.state
        return (
            <div>
                {/**  TODO 这个Button是为了测试*/}
                {/* <Button type="primary" onClick={this.props.showModal}>
                    Open Modal with customized footer
                </Button> */}

                <Modal
                    visible={visible}
                    title="Title"
                    // onOk={this.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.props.handleOk} loading={loading}>
                            Submit
                        </Button>
                    ]}
                >
                    {
                        this.props.contents
                    }
                </Modal>
            </div>
        )
    }
}

export {MyModal}
