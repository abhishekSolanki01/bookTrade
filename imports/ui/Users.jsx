import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import TitleBar from './TitleBar';
import { BooksInfo } from '../api/booksInfo'


export default class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            BooksInfoInState: BooksInfo.find().fetch()
        }
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            Meteor.subscribe('ziglerNata')
            Meteor.subscribe('AllUsers')
            this.setState({
                users: Meteor.users.find().fetch(),
                BooksInfoInState: BooksInfo.find().fetch()
            })
            this.renderUsers()
        })
    }

    componentWillUnmount() {
        this.tracker.stop()
    }

    renderUsers() {

        let bookCountForThisUser = 0;
        return (this.state.users.map((user) => {
            bookCountForThisUser = 0;
            this.state.BooksInfoInState.map((book) => {
                if (book.userId === user._id) {
                    bookCountForThisUser++
                }
            });

            return (
                <div key={user._id} className="user">
                    <h1 key={user._id}>{user.profile.name}</h1>
                    <h5>{"city : " && user.profile.city}</h5>
                    <h5>Books : {bookCountForThisUser}  |  incomming request: </h5><hr/>
                </div>
            )
        }))
    }

    render() {
        return (
            <div>

                <TitleBar title="bK" />
                <div className="wrapper">
                    <div className="info-abt-page">
                        <h1>All Users</h1>
                    </div>
                    <div className="users-info">
                        {this.renderUsers()}
                    </div>
                </div>

            </div>
        );
    }
}