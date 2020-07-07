import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateNewEvent extends React.Component{
    state ={
        firstN: sessionStorage.firstN,
        lastN: sessionStorage.lastN
    }

    // function to create event and stick it to backend
    createEvent = (e) => {
        e.preventDefault()
        if(e.target.title.value === '' || e.target.fullAddress.value === '' || e.target.season.value === '' || e.target.zipcode.value === ''){
            return alert("You can't leave non-optional areas blank")
        }
        const newEvent = {
            title: e.target.title.value,
            fullAddress: e.target.fullAddress.value,
            category: 'Event',
            hours: e.target.hours.value,
            phone: e.target.phone.value,
            website: e.target.website.value,
            season: e.target.season.value,
            zipcode: e.target.zipcode.value,
            lat: '',
            lng: ''
        }
        if(newEvent.hours === ""){ newEvent.hours = null }
        if(newEvent.phone === ""){ newEvent.phone = null }
        if(newEvent.website === ""){ newEvent.website = null }

        fetch(`https://discover.search.hereapi.com/v1/discover?in=circle:40.7533,-73.9069;r=13000&q=${newEvent.fullAddress},${newEvent.zipcode}&apiKey=BAMub3z8qQq1pGLTfj7NFtP4qbz8BcKuukeljc03ikI`)
        .then(resp => resp.json())
        .then(data => {
            newEvent.fullAddress = data.items[0].address.label
            newEvent.lat = data.items[0].position.lat
            newEvent.lng = data.items[0].position.lng
            // console.log(newEvent)
            this.props.handlerCreateEvent(newEvent)
        })
    }

    render(){
        return(
            <div>
                <div className='list-group-item'>                
                    <form onSubmit={this.createEvent}>
                        <div className="form-group col-sm-12">
                            <label>Event Title:</label>
                            <input type="text" className="form-control" 
                            placeholder='Title' name='title'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Full address:</label>
                            <input type="text" className="form-control" 
                            placeholder='Full address' name='fullAddress'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Hours (optional):</label>
                            <input type="text" className="form-control" 
                            placeholder='Hours' name='hours'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Phone number (optional):</label>
                            <input type="text" className="form-control" 
                            placeholder='Phone Number' name='phone'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Website (optional):</label>
                            <input type="text" className="form-control" 
                            placeholder='Website' name='website'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Season:</label>
                            <input type="text" className="form-control" 
                            placeholder='summer or winter' name='season'/>
                        </div>
                        <div className="form-group col-sm-12">
                            <label>Zipcode:</label>
                            <input type="text" className="form-control" 
                            placeholder='Zipcode' name='zipcode'/>
                        </div>
                        <div className='createBtn'>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}