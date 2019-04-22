import React, {Component} from 'react'
import {NavMain, MainMenu, MainMenu1} from './nav'

export class MainWin extends Component {


    render() {
        return (
            <div>
                <NavMain />
                <MainMenu />
                <MainMenu1 />
            </div>



        )
    }
}