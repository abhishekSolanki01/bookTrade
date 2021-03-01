import React from "react";

import NavBar from './NavBar';
import {Logo} from './Logo'
import UserName from './UserName'


export default class TitleBar extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className="title-bar">
                <div className="title-bar-content">
                    <div className="logo-wrapper">
                        {/* <Logo /> */}
                        <h1>{this.props.title}</h1>
                    </div>      
                    <NavBar />    
                    <UserName /> 
                </div>    
            </div>
        );
    }
}

