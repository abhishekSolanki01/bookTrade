import React from 'react';

import { Accounts } from 'meteor/accounts-base'

import { BooksInfo } from '../api/booksInfo'
import { Tracker } from 'meteor/tracker'    

 
export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state={
            error : "",
            email : "",
            password: "",
            name: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        if(e.target.name === 'email'){
            const email = e.target.value.trim();
            this.setState({email});
        }else if(e.target.name === 'password'){
            const password = e.target.value.trim();
            let length = e.target.value.length;
            if(length <= 8){
                this.setState({error :`password length must be grater than ${length}`})
            }else{
                this.setState({error: ""})
            }
            
            this.setState({password});
        }else if(e.target.name === 'name'){
            const name = e.target.value.trim();
            this.setState({name});
        }
    }

    onSubmit(e){
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let name = this.state.name;
        var options = {
            email,
            password,
            profile: {
                name
            }
        };
        if(this.state.password.length <= 8) {
            this.setState({error : `password must be greater than 8 character`})
            return;
        }
        Accounts.createUser(options ,(error) => {
            console.log("logging user", error)
            if(error){
                this.setState({error : error.reason})
            }else{
                this.setState({error: ""})
            }
        });

    }
    
    render(){
            console.log(Accounts.userId());
            console.log("-->", Accounts.user())
            return(
                <div className="wrapper">
                    <h1>Signup page</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                            <input type="text"  
                            required={true}   
                            className="button"   
                            name="name"           
                            placeholder="Name" 
                            onChange={this.handleChange}/>
                        <input type="email" 
                            className="button" 
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}/>
                        <input type="password"     
                            className="button"    
                            name="password"
                            placeholder="Password" 
                            onChange={this.handleChange}/>
                        <button type="submit" className="button" >Create Accounts</button>    
                    </form>                   
                </div>
            );
    }
}
