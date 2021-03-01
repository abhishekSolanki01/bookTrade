import React from "react"
import { Meteor } from 'meteor/meteor'

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error: "",
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e){
        if(e.target.name === 'email'){
            const email = e.target.value.trim();
            this.setState({email});
        }else{
            const password = e.target.value.trim();
            this.setState({password});
        }
    }

    onSubmit(e){
        e.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, (error)=>{
            if(error){
                this.setState({error : "Something is terribly wrong"})
            }
        })
    }

    render(){
        console.log(Meteor.userId())
        return (
            <div className="wrapper">
                <h1>Login page</h1>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" 
                        className="button"
                        value={this.state.email} 
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}/>
                    <input type="password"     
                        className="button"                        
                        value={this.state.password} 
                        placeholder="Password" 
                        onChange={this.handleChange}/>
                    <button type="submit" className="button" >Login</button>    
                </form>                   
            </div>
        );
    }
}