import React from "react";
import { Redirect } from "react-router-dom";


export default class Navbar extends React.Component {
    state = {
        logOutToggle: false
    }

    handlerLogOut = () => {
        sessionStorage.clear()
        this.setState({ logOutToggle: !this.state.logOutToggle})
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                { this.state.logOutToggle ? <Redirect to='/'/> : null}
                <a className="navbar-brand" href="/seasonPick">Markit</a>
            
                <div className="navbar-nav">
                    <div className="nav-item">
                        <a className="nav-link" href="/seasonPick">Home</a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link" href="/summer">Summer Events</a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link" href="/winter">Winter Events</a>
                    </div>
                </div>
                <div className="navbarUser">
                    <a className="nav-link" href="/userProfile">Welcome {sessionStorage.getItem("firstN")}</a>
                </div>
                <div className="navbarLogOut">
                    <button className="btn btn-danger" onClick={this.handlerLogOut} >Log out</button>
                </div>
            </nav>
        )
    }
}