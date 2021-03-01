import React from 'react';
import { Link } from 'react-router-dom'


export default class NavBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="navbar navbar-items">
                <ul>
                    <li><Link className="link" to="/books">Books</Link></li>
                    <li className="request"> <span>Request</span>
                        <div className="request-dropdown">
                            <Link className="link" to="#"><span>All Requests</span></Link><hr/>
                            <span ><Link className="link" to="#">Create Request</Link></span>
                        </div></li>
                    <li><Link className="link" to="#">Trades</Link></li>
                    <li><Link className="link" to="/users">Users</Link></li>
                </ul>
            </div>

        )
    }
}