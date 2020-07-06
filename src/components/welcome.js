import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';


export default class welcome extends React.Component{
    state ={
        displayForm: false,
        redirectToggle: false
    }

    displayFormHandler = () => {
        this.setState({ displayForm: !this.state.displayForm })
    }

    createOrFindUser = (e) => {
        e.preventDefault()
        const data = {
            firstN: e.target.firstN.value,
            lastN: e.target.lastN.value,
            zipcode: e.target.zip.value
        }

        fetch('http://localhost:3000/users', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                alert("You can't leave anything blank")
                return <Redirect to='/'/>
            }
            sessionStorage.setItem("userId", data.id)
            sessionStorage.setItem("firstN", data.firstN);
            sessionStorage.setItem("lastN", data.lastN);
            sessionStorage.setItem("zipcode", data.zipcode);
            this.setState({ redirectToggle: true})
        })
    }

    handlerRedirect = () =>{
        if(this.state.redirectToggle) { 
            return <Redirect to='/seasonPick'/> 
        }else if(sessionStorage.getItem("firstN") !== null){
            return <Redirect to='/seasonPick'/> 
        }
    }
        

    render(){
        return(
            <div className='text-center'>
                {this.handlerRedirect()}
                <div>
                    <h1 className='welcome'><strong>Welcome to MarkIt!</strong></h1>
                    <p className='welcomeMess'>This website will find local events/venue 
                        for you to attend/visit and enjoy your free time in New York!</p>
                    <p className='sentOff'>You will never be bored again!</p>
                    {this.state.displayForm ?
                    <form id='createForm' className="form-inline" onSubmit={this.createOrFindUser}>
                            <input className="form-control mb-2 mr-sm-2 col-sm-4" placeholder="First Name" name='firstN'/>
                            <input className="form-control mb-2 mr-sm-2 col-sm-4" placeholder="Last Name" name='lastN'/>
                            <input className="form-control mb-2 mr-sm-2 col-sm-2" placeholder="Zipcode" name='zip'/>
                            <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>: 
                    <button className='startBtn' onClick={this.displayFormHandler}>Get Started</button>}
                </div>
                <img alt='welcomeImg' className="welcomeImg" src={'/img/wintervsSummer1.jpg'} />
            </div>
        )
    }
}