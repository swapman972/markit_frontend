import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

export default class UserShowPage extends React.Component{
    state ={
        firstN: sessionStorage.firstN,
        lastN: sessionStorage.lastN,
        zipcode: sessionStorage.zipcode
    }

    // function to redirect user if he is not logged in 
    handlerRedirect = () =>{
        if(sessionStorage.getItem("userId") === null){
            return <Redirect to='/'/> 
        }
    }

    // function to follow the change happening in the edit user form
    handleChange = (event) => {
        const target = event.target.name;
        this.setState({ [target]: target.value });
    }

    // function to delete user from backend and redirect to log in
    handleDeleteUser = () => {
        fetch(`http://localhost:3000/users/${sessionStorage.userId}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(() => {
            sessionStorage.clear()
            this.setState({ firstN: ''})
        })
    }

    // function to update user when update is submitted 
    updateUser = (e) => {
        e.preventDefault()
        if(e.target.firstN.value === '' || e.target.lastN.value === '' || e.target.zipcode.value === ''){
            alert("You can't leave anything blank")
            return <Redirect to='/userProfile'/>
        }
        const data = {
            firstN: e.target.firstN.value,
            lastN: e.target.lastN.value,
            zipcode: e.target.zipcode.value
        }

        fetch(`http://localhost:3000/users/${sessionStorage.userId}`, {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(resp => resp.json())
        .then(data => {
            sessionStorage.setItem("firstN", data.firstN);
            sessionStorage.setItem("lastN", data.lastN);
            sessionStorage.setItem("zipcode", data.zipcode);
            alert('Your profile got updated!')
        })
    }

    render(){
        return(
            <div>
                <div>
                    <img alt='userUpdateImg' className="userUpdateImg" src={'/img/wintervsSummer1.jpg'} />
                </div>
                <div className='list-group-item'>                
                    {this.handlerRedirect()}
                    <form onSubmit={this.updateUser}>
                        <div className="form-group col-sm-12">
                            <label>First Name:</label>
                            <input type="text" className="form-control" 
                            value={this.state.firstN} name='firstN' onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Last Name:</label>
                            <input type="text" className="form-control" 
                            value={this.state.lastN} name='lastN' onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Zipcode:</label>
                            <input type="text" className="form-control" 
                            value={this.state.zipcode} name='zipcode' onChange={this.handleChange}/>
                        </div>
                        <div className='updateBtn'>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                    <button id='deleteUser' className="btn btn-danger" onClick={this.handleDeleteUser}>Delete</button>
                </div>
            </div>
        )
    }
}