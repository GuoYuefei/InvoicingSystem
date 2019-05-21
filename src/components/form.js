/**
* @description 适用于本工程大多数数可能是全部的表单组件封装
* @author Solomon
* @license MIT
* @created 2019-05-20T16:51:17 Z+08:00
* @last_modified 2019-05-21T21:31:01 Z+08:00
* 
* @flow 
*/

import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

type MyInputProps = {
    //此属性决定input的类型，比如日期选择框 or text or others
    type: string,
    // 设置必要的原因： 需要提示框，这里不提倡使用label代替
    placeholder: string,
    size?: string,
    allowClear?: boolean,
    disabled?: boolean,
    prefix?: any,
    onChange?: (e: any) => void
}

type Props = {
    form: any,          //Form.create传递
    dataSource: Array<{
        id: string,
        options: any,
        dataSource: MyInputProps,
    }>,

    handleSubmit: (event: any) => void

}


class TempForm extends Component<Props> {

    handleSubmit: (e: any) => void

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };


    render() {

        const { getFieldDecorator } = this.props.form

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} >
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                </Form.Item>
                {
                    this.props.dataSource.map((v, i, a) => (
                        getFieldDecorator(v.id, v.options)(
                            GetInput(v.dataSource)
                        )
                    ))
                }
            </Form>
        )
    }
}




function GetInput(props: MyInputProps) {
    switch(props.type) {
        case "text": return (
            <Input allowClear {...props} />
        )
        default: return (
            <Input allowClear {...props} />
        )
        
    }
}




const MyForm = Form.create({
    mapPropsToFields: props => ({           // 应该是把MyForm的props映射到TempForm上
        ...props            
    }),
    name: "MyForm"
})(TempForm)


export { MyForm }
