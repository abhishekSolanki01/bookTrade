import React from 'react';
import { Link } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu';

let styles={};
export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onClickNav: "navbar navbar-items",
            clicked: false
        }
        this.openNav = this.openNav.bind(this)
    }
    openNav() {
        if (this.state.clicked === false) {
            //this.setState(()=>({clicked:false}))
            const onClickNav = "navbar navbar-items navbar-items__mobile";
            console.log("nav clicked");
            this.setState(() => ({ onClickNav, clicked: true }))
            styles = {
                containerStyle: {
                  left: '-0vw'
                }
              };
        } else {
            const onClickNav = "navbar navbar-items ";
            console.log("nav un clicked");
            this.setState(() => ({ onClickNav, clicked: false }))
        }

    }
    render() {
          let { containerStyle } = styles;
        return (
            <div>
                <span onClick={this.openNav} className="desktop"><MenuIcon fontSize="large"/></span>
                <div className={this.state.onClickNav} style={containerStyle}>
                    <span onClick={this.openNav} className="cross-btn-nav desktop">X</span>
                    <ul>
                        <Link className="link" to="/books"><li>Books</li></Link>
                        <li className="request"> <span>Request</span>
                            <div className="request-dropdown">
                                <Link className="link" to="#"><span>All Requests</span></Link><hr />
                                <span ><Link className="link" to="#">Create Request</Link></span>
                            </div></li>
                        <Link className="link" to="#"><li>Trades</li></Link>
                        <Link className="link" to="/users"><li>Users</li></Link>
                    </ul>
                </div>
            </div>
        )
    }
}