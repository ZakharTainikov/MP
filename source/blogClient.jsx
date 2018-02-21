import "./styles.css";

import React from 'react';
import ReactDOM from 'react-dom';

class UserGreeting extends React.Component {
    render() {
        return <h1>Welcome {this.props.author} !</h1>;
    }
}

class GuestGreeting extends React.Component {
    render() {
        return (
            <span>
                <h1>Please sign up.</h1>
                Enter you name: <input type='text' onChange={this.props.onChange}></input>
            </span>
        );
    }
}

class Greeting extends React.Component {
    render() {
        if (this.props.isLoggedIn)
            return <UserGreeting author={this.props.author} />;
        else
            return <GuestGreeting onChange={this.props.onChange} />;

    }
}

class LoginButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.buttonText}
            </button>
        );
    }
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.updateLoginName = this.updateLoginName.bind(this);
        this.loginOutClick = this.loginOutClick.bind(this);
        this.state = {
            isLoggedIn: false,
            author: "Guest"
        };
    }

    updateLoginName(e) {
        this.setState({ author: e.target.value });
    }

    loginOutClick() {
        let userInfo = {};
        if (this.state.isLoggedIn) {
            userInfo.isLoggedIn = false;
            userInfo.userName = "Guest";
        } else {
            userInfo.isLoggedIn = true;
            userInfo.userName = this.state.author;
        }

        this.setState({ isLoggedIn: userInfo.isLoggedIn });
        this.setState({ author: userInfo.userName });
        this.props.onLoginChange(userInfo);
    }

    render() {
        const buttonText = this.state.isLoggedIn ? "LogOut" : "LogIn";
        return (
            <div>
                <Greeting author={this.state.author} isLoggedIn={this.state.isLoggedIn} onChange={this.updateLoginName} />
                <LoginButton buttonText={buttonText} onClick={this.loginOutClick} />
            </div>
        );
    }
}

class NewBlog extends React.Component {
    constructor(props) {
        super(props);
        this.onAddBlog = this.onAddBlog.bind(this);
        this.onBlogTextChange = this.onBlogTextChange.bind(this);
        this.state = { blogText: "" };
    }

    onAddBlog() {
        if (this.state.blogText) {
            this.props.onAddBlog(this.state.blogText);
            this.setState({ blogText: "" });
        }
    }

    onBlogTextChange(e) {
        this.setState({ blogText: e.target.value });
    }

    render() {
        return (
            <div>
                <b>Enter new blog:</b>
                <input type='text' onChange={this.onBlogTextChange} value={this.state.blogText} ></input>
                <input type='button' value='Post' onClick={this.onAddBlog}  ></input>
            </div>
        );
    }
};


class AllBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteBlog = this.onDeleteBlog.bind(this);
    }

    onDeleteBlog(e) {
        let index = e.target.value;
        this.props.onDeleteBlog(index);
    }

    render() {
        let blogs = this.props.blogs;

        const listItems = blogs.map((blog, index) =>
            <div key={index} className='blog'>
                <div>
                    <button className='buttonX' value={index} onClick={this.onDeleteBlog}>X</button>
                    <span className='colorBlue'>{blog.text}</span>
                </div>
                <div className='newsAuthor'><b>{blog.author}</b></div>
            </div>
        );

        return (
            <div>
                {listItems}
            </div>
        );
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.onAddBlog = this.onAddBlog.bind(this);
        this.onDeleteBlog = this.onDeleteBlog.bind(this);
        this.state = {
            isLoggedIn: false,
            userName: "Guest",
            blogs: []
        };
    }

    handleLoginEvent(info) {
        this.setState({ isLoggedIn: info.isLoggedIn });
        this.setState({ userName: info.userName });
    }

    onDeleteBlog(index) {
        let allBlogs = this.state.blogs;
        allBlogs.splice(index, 1);
        this.setState({ blogs: allBlogs });
    }

    onAddBlog(blogText) {
        let newBlog = {
            author: this.state.userName,
            text: blogText
        }
        let allBlogs = this.state.blogs;
        allBlogs.push(newBlog);
        this.setState({ blogs: allBlogs });
    }

    render() {
        return (
            <div>
                <LoginControl onLoginChange={this.handleLoginEvent} />
                {this.state.isLoggedIn && this.state.userName != "Guest" ? <NewBlog onAddBlog={this.onAddBlog} /> : null}
                {this.state.isLoggedIn && <AllBlogs blogs={this.state.blogs} onDeleteBlog={this.onDeleteBlog} />}
            </div>
        );
    }
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

