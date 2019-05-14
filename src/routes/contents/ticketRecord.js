/**
 * 购票记录也面 
 * @author Solomon
 * @license MIT
 * 
 * @flow
 */
import React, { Component } from 'react'

import { Frame } from '../../components/frame';

import type { FrameProps } from '../../components/frame'


// type FrameProps = {
//     title: string,
//     control: {
//         onChange: Function,
//         value: string,
//         content: Array<{value: string, name: string}>
//     },
//     infoTotal: React$Element<any>,
//     infoView: React$Element<any>,
// }

type Props = {}

type TiRcdTableProps = {}

export class TicketRecord extends Component<Props> {

    info: FrameProps

    constructor(props: Props) {
        super(props)
        this.info = {
            title: "购票记录",
            infoTotal:<div></div>,
            infoView: <div></div>
        }
    }


    render() {
        return (
            <Frame {...this.info}/>

        )
    }
}



class TiRcdTable extends Component<TiRcdTableProps> {

}

