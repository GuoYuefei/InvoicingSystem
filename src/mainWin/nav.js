
import React,{ Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Row, Col, Dropdown } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
// import {} from 'react-bootstrap/Nav'

export class NavMain extends Component<any> {



    render() {
        return (
            // <div>
            // <Nav defaultActiveKey="/home" className="flex-column">
            //     <Nav.Link href="/home">首页</Nav.Link>
            //     {/* Invoicing statistics */}
            //     <Nav.Link eventKey="IS">开票统计</Nav.Link>
            // </Nav>
   
            <Row>
            <Col md={2}>
                
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="flex-column">
                <Navbar.Brand href="#home">首页</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="flex-column ">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    <NavDropdown title="开票统计" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">当日开票</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">本月开票</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">上月开票</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">三个月内开票</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.5">开票查询</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.6">开票统计</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="退废票统计" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">退票记录</NavDropdown.Item>
                        <NavDropdown.Item href="#">作废发票</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="购存统计" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">购票记录</NavDropdown.Item>
                        <NavDropdown.Item href="#">发票库存</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="其他统计" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">遗失发票</NavDropdown.Item>
                        <NavDropdown.Item href="#">缴销发票</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="其他" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">收发记录</NavDropdown.Item>
                        <NavDropdown.Item href="#">货品或项目</NavDropdown.Item>
                        <NavDropdown.Item href="#">客户</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Col>
            </Row>
        )
    }
}

export class MainMenu extends Component<any> {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }


    onToggle = () => {
        let state = this.state
        state.isOpen = !this.state.isOpen 
        this.setState(state)
    }


    render() {
        return (
            <Row>
            <Col md={2}>
            <Dropdown onClick={this.onToggle} show={this.state.isOpen}>
                <Dropdown.Toggle >点我</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Col>
            </Row>
        )
    }
}

export class MainMenu1 extends Component {



    render() {
        return (
            <Row>
            <Col md={2}>
                <NavDropdown>
                    <Navbar.Toggle value="somethings">
                        Something
                    </Navbar.Toggle>
                    
                </NavDropdown>
            
            </Col>
            </Row>
        )
    }
}
