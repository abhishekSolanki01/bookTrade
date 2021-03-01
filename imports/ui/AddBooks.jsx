import React from "react";
import { Meteor } from 'meteor/meteor'
import { BooksInfo } from "../api/booksInfo";
import PublishIcon from '@material-ui/icons/Publish';
import FlipMove from 'react-flip-move';


import { Tracker } from 'meteor/tracker';

import TitleBar from './TitleBar'


export default class AddBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBooks: []
        }
        this.renderMyBooks = this.renderMyBooks.bind(this)
        this.showCrossButton = this.showCrossButton.bind(this)
        this.removeBook = this.removeBook.bind(this)
    }
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            Meteor.subscribe('ziglerNata')
            let myBooks = BooksInfo.find({ userId: Meteor.userId() }).fetch();
            this.setState({ myBooks });
            this.renderMyBooks();
        })
    }
    renderMyBooks() {
        //Tracker.autorun(() => { point to noted autorun breaks the map function

        return (this.state.myBooks.map(book => {
            return (
                <div key={book._id} className="book-info">
                    <div className="book-info-content">
                        <div className="book-info-content-t-a">
                            <h3>{book.title} </h3>
                            <h5>{book.author}</h5>
                        </div>
                        {book.userId === Meteor.userId() && this.showCrossButton(book._id)}
                    </div>
                </div>
            )
        })
        )
        //})
    }
    showCrossButton(bookId) {
        if (Meteor.userId()) {   //will change the condition once learn about subscriptions
            return (
                <div key={bookId} className="book-info-content-cross">
                    <button className="button" onClick={() => this.removeBook(bookId)}>X</button>
                </div>

            )
        }
        return null;
    }
    removeBook(bookId) {
        Meteor.call('booksInfo.remove', bookId);
    }

    onSubmit(e) {
        e.preventDefault();
        let title = e.target.title.value; //this.refs.title.value.trim();
        let author = this.refs.author.value.trim();
        let description = this.refs.description.value.trim();
        let imageUrl = this.refs.imageUrl.value;

        if (title && author && Meteor.userId()) {//later in the call back i will add his userid to usr coll
            Meteor.call('booksInfo.insert', title, author, description, imageUrl);
        }

        this.refs.title.value = "";
        this.refs.author.value = "";
        this.refs.description.value = "";
        this.refs.imageUrl.value = "";
    }
    render() {
        return (
            <div>
                <TitleBar title={"bK"} />
                <div className="wrapper">
                    <div className="info-abt-page">
                        <h1>Add books</h1>
                    </div>
                    <div className="add-books">
                        <form onSubmit={this.onSubmit.bind(this)} >

                            <div className="add-books-container">
                                <div className="add-books-container__left">
                                    <input ref="title" name="title" placeholder="Title of the book" />
                                    <input ref="author" name="author" placeholder="Name of the Author" />
                                    <input ref="description" name="description" placeholder="Any discription" />
                                </div>
                                <div className="add-books-container__right">
                                    <div className="book-image">
                                        <PublishIcon className="icon" style={{ fontSize: 140 }} />
                                    </div>
                                    <div className="upload-book-image">
                                        <input type="file" ref="imageUrl" name="imageUrl" placeholder="Upload pic" />
                                    </div>

                                </div>
                            </div>

                            <div className="add-books-container__bottom">
                                <button className="item-button-purple button" type='submit'>Add book to exchange!</button>
                            </div>

                        </form>
                    </div>
                    <div>
                        <div className="info-abt-page my-books">
                            <h1>Yours' books</h1>

                        </div>
                        <div>
                            <FlipMove maintainContainerHeight={true}>
                                {this.renderMyBooks()}
                            </FlipMove>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
