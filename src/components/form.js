/**
* @description 适用于本工程大多数数可能是全部的表单组件封装
* @author Solomon
* @license MIT
* @created 2019-05-20T16:51:17 Z+08:00
* @last_modified 2019-05-20T17:25:44 Z+08:00
* 
* @flow 
*/

import React, { Component } from 'react'
import { Form } from 'antd';

type Props = {}


class TempForm extends Component<any> {


    render() {

        const { getFieldDecorator } = this.props.form

        return (
            <Form>
                <Form.Item>

                </Form.Item>
            </Form>
        )
    }
}

const MyForm = Form.create({
    mapPropsToFields: props => ({
        ...props
    })
}, TempForm)

export { MyForm }
