/**
* @description 适用于本工程大多数数可能是全部的表单组件封装
* @author Solomon
* @license MIT
* @created 2019-05-20T16:51:17 Z+08:00
* @last_modified 2019-05-22T14:56:33 Z+08:00
* 
* @flow 
*/

import React, { Component } from 'react';
import { Form, Input, DatePicker } from 'antd';

export type MyInputProps = {
    //此属性决定input的类型，比如日期选择框 or text or others
    type?: string,
    // 设置必要的原因： 需要提示框，这里不提倡使用label代替
    placeholder?: string,
    size?: string,
    allowClear?: boolean,
    disabled?: boolean,
    prefix?: any,           //element
    onChange?: (e: any) => void
}

export type Props = {
    dataSource: Array<{
        id?: string,
        options?: any,
        dataSource: MyInputProps,
    }>,
    
    handleSubmit?: (event: any, validateFields: Function) => void,
    
}
// from是Form.create函数执行后注入的属性
export type TempFormProps = Props & {form: any}   


/**
 *
 * @class TempForm
 * @extends {Component<TempFormProps>}
 */
class TempForm extends Component<TempFormProps> {

    handleSubmit: (e: any) => void

    submit = e => {
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('Received values of form: ', values);
        //   }
        // });
        this.props.handleSubmit&&this.props.handleSubmit(e, this.props.form.validateFields)
    };


    render() {

        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="vertical" onSubmit={this.submit} >
                {/* <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                </Form.Item> */}
                {
                    this.props.dataSource.map((v, i, a) => (
                        <Form.Item key={i}>
                            {
                                v.id&&v.options ?
                                getFieldDecorator(v.id, v.options)(
                                    GetInput(v.dataSource)
                                )
                                :
                                GetInput(v.dataSource)
                            }
                        </Form.Item>
                    ))
                }
                {/* <Form.Item> */}
                {/* disabled={hasErrors(getFieldsError())} */}
                    {/* <Button type="primary" htmlType="submit" ref={ref} >
                        Log in
                    </Button>
                </Form.Item> */}
            </Form>
        )
    }
}




/**
 *
 * @export
 * @param {MyInputProps} props
 * @returns
 */
export function GetInput(props: MyInputProps) {
    switch(props.type) {
        case "text": return (
            <Input allowClear {...props} />
        )
        case "date": return (
            <DatePicker style={{ width: '100%' }} />
        )
        default: return (
            <Input allowClear {...props} />
        )
        
    }
}




const MyForm = Form.create({
    // mapPropsToFields: props => ({           // 应该是把MyForm的props映射到TempForm上
    //     ...props            
    // }),
    name: "MyForm"
})(TempForm)


export { MyForm }
