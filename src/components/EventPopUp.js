import React from 'react';
import {Popup} from "react-map-gl"

export default class EventPopUp extends React.Component{
    state = {
        likes: 0
    }

    componentDidMount(){
        fetch(`http://localhost:3000/events/${this.props.selectedEvent.id}`)
        .then(resp => resp.json())
        .then(data => { 
            this.setState ({ 
                likes: data.likes 
            })
        })
    }

    handlerLike = (e) => {
        const data = {
            user_id: sessionStorage.getItem('userId'),
            event_id: this.props.selectedEvent.id
        }
        fetch('http://localhost:3000/ratings', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(resp => resp.json())
        .then(()=> {
            this.setState({likes: this.state.likes + 1})
        })
    }

    handlerLikeShow = () => {
        if(this.props.selectedEvent.category === "City Bike"){
            return null
        }else if(this.props.selectedEvent.category === "Train Station"){
            return null
        } else {
            return (
                <div>
                    <div>Likes: {this.state.likes}</div>
                    <button className='btn btn-outline-success' onClick={this.handlerLike}>like</button>
                </div>)
        }
    }

    render(){
        return(
            <Popup latitude={this.props.selectedEvent.lat} 
                longitude={this.props.selectedEvent.lng}
                // onClose={this.props.ClosePopUp}
                >
                <div>
                    <button className='popUpClose' 
                    onClick={this.props.ClosePopUp}><strong>x</strong></button>
                    <h1>{this.props.selectedEvent.title}</h1>
                    <p><strong>{this.props.selectedEvent.fullAddress}</strong></p>
                    {this.props.selectedEvent.hours ? <p><strong>Hours: </strong>{this.props.selectedEvent.hours}</p> : null }
                    {this.props.selectedEvent.phone ? <p><strong>Phone#: </strong>{this.props.selectedEvent.phone}</p> : null }
                    {this.props.selectedEvent.website ? <p><strong>Website: </strong>{this.props.selectedEvent.website}</p> : null }
                    {this.handlerLikeShow()}
                </div>
            </Popup>
        )
    }
}