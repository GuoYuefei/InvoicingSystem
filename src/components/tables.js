// @flow
import React, {Component} from 'react'
import {Table} from 'antd'

type DataSoruce = Array<{key: String, ...}>
type Columns = Array<{key: string, ...}>
type Props = {
    data: DataSoruce,
    columns: Columns,
    handleChange?: (pagination:any, filters: Object, sorter: Object)=>void,

    control: Component<any>
}

class MyTable extends Component<Props> {

    
    render() {
        let Control: any = this.props.control
        return (
            <div>
                <div className="table-operations">
                
                    <Control/>   
                </div>
                <Table columns={this.props.columns} dataSource={this.props.data} onChange={this.props.handleChange} />
            </div>
        )
    }
}