import React from 'react'
import ReactMapGL, { NavigationControl } from "react-map-gl"
import EventPopUp from './EventPopUp'
import EventMarker from './EventMarker'
import UserLocation from './UserLocation'
import { Redirect } from 'react-router-dom'
import CreateNewEvent from './CreateNewEvent'
const mapAPIkey = process.env.REACT_APP_MAP_API_KEY

export default class summerSeason extends React.Component{
    state = {    
        summerEvents: [],
        bikes: [],
        bikeDisplayToggle: false,
        trains: [],
        trainDisplayToggle: false,
        selectedEvent: null,
        filter: '',
        styleForMap: "streets-v11",
        userArea: false,
        viewport: {
            latitude: 40.743,
            longitude: -73.924,
            width: "100vw",
            height: "100vh",
            zoom: 12
        },
        settings: {
            scrollZoom: false,
        },
        navSettings: {
            showCompass: false
        },
        newFormToggle: false
    }

    // function to redirect user if he is not logged in 
    handlerRedirect = () =>{
        if(sessionStorage.getItem("userId") === null){
            return <Redirect to='/'/> 
        }
    }

    // function that logs all trains, bikes and events database when the page loads
    componentDidMount = () => {
        fetch('http://localhost:3000/bikes')
        .then(resp => resp.json())
        .then(data => { 
            this.setState ({ 
                bikes: data 
            })
        })

        fetch('http://localhost:3000/trains')
        .then(resp => resp.json())
        .then(data => { 
            this.setState ({ 
                trains: data 
            })
        })

        fetch('http://localhost:3000/events')
        .then(resp => resp.json())
        .then(data => { 
            const summerData = data.filter(event => event.season.includes('summer'))
            this.setState ({ 
                summerEvents: summerData 
            })
        })
    }

    // function to close PopUp
    handlerClosePopUp = () => {
        this.setState({ selectedEvent: null })
    }

    // function to show marker once it is clicked
    handlerEventClick = (event) => {
        this.setState({ selectedEvent: event })
    }

    // function to display all bikes when button is clicked
    handlerDisplayBike = () => {
        this.setState({ bikeDisplayToggle: !this.state.bikeDisplayToggle})
    }

    // function to display all trains when button is clicked
    handlerDisplayTrain = () => {
        this.setState({ trainDisplayToggle: !this.state.trainDisplayToggle})
    }

    // fucntion to filter events
    handlerDropdownFilter = (e) =>{
        if(e.target.value === 'All'){
            this.setState({
                filter: ''
            })
        } else
        this.setState({
            filter: e.target.value
        })
    }

    // function to change map style when click on styleBtn
    handlerMapStyle = (e) => {
        if(e.target.innerHTML === 'Default'){
            this.setState({ styleForMap: "streets-v11"})
        }else if(e.target.innerHTML === 'Dark'){
            this.setState({ styleForMap: "dark-v10"})
        }else if(e.target.innerHTML === 'Driving?'){
            this.setState({ styleForMap: "navigation-preview-day-v4"})
        }
    }

    // function to show where the user is located
    handlerUserAreaShow = () =>{
        this.setState({ userArea: !this.state.userArea})
    }
    
    // function to chow the new event form submission
    handlerNewEventForm = () =>{
        this.setState({ newFormToggle: !this.state.newFormToggle})
    }
    
    // function to create event once submitted
    handlerCreateEvent = (newEvent) => {
        console.log('new event created: ', newEvent)

        fetch('http://localhost:3000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ 
                newFormToggle: !this.state.newFormToggle,
                summerEvents: [...this.state.summerEvents, data]
            })
        })
    }

    render(){
        const summerEventsFiltered = this.state.summerEvents.filter(event =>{
            return event.category.includes(this.state.filter)
        })

        return(
            <div>
                {this.handlerRedirect()}
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.viewport.longitude.toFixed(3)} | Latitude: {this.state.viewport.latitude.toFixed(3)} | Zoom: {this.state.viewport.zoom}</div>
                </div>
                <ReactMapGL {...this.state.viewport} {...this.state.settings}
                mapboxApiAccessToken= {mapAPIkey}
                mapStyle={`mapbox://styles/mapbox/${this.state.styleForMap}`}
                onViewportChange={viewport => {
                    this.setState({viewport});
                }}>
                    <div className='navControl'>
                         <NavigationControl {...this.state.navSettings}/>
                    </div>
                    <button id='filterBtn1' type="button" className='btn btn-primary' onClick={this.handlerDisplayBike} >Bike</button>
                    <button id='filterBtn2' type="button" className="btn btn-primary" onClick={this.handlerDisplayTrain} >Train</button>
                    <button id='styleBtn1' type="button" className='btn btn-secondary' onClick={this.handlerMapStyle} >Default</button>
                    <button id='styleBtn2' type="button" className="btn btn-dark" onClick={this.handlerMapStyle} >Dark</button>
                    <button id='styleBtn3' type="button" className="btn btn-info" onClick={this.handlerMapStyle} >Driving?</button>
                    <button id='userLocation' type="button" className="btn btn-warning" onClick={this.handlerUserAreaShow} >Where Am I?</button>
                    <button id='newEventBtn' type="button" className="btn btn-success" onClick={this.handlerNewEventForm} >Create an Event</button>
                    <div className="dropdownFilter">
                        <select className='btn btn-primary' onChange={this.handlerDropdownFilter}>
                            <option value="All">All</option>
                            <option value="Event">Event</option>
                            <option value="Art">Art</option>
                            <option value="Museum">Museum</option>
                            <option value="Park">Park</option>
                            <option value="BBQ">BBQ</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Pool">Pool</option>
                            <option value="Rooftop">Rooftop</option>
                        </select>
                    </div>       
                    {this.state.bikeDisplayToggle ? this.state.bikes.map(event => {
                        return <EventMarker key={event.id} 
                        event={event} handlerEventClick={this.handlerEventClick}/>
                        }) :null
                    }
                    {this.state.trainDisplayToggle ? this.state.trains.map(event => {
                        return <EventMarker key={event.id} 
                        event={event} handlerEventClick={this.handlerEventClick}/>
                        }) :null
                    }
                    {summerEventsFiltered.map(event => {
                        return <EventMarker key={event.id} 
                        event={event} handlerEventClick={this.handlerEventClick}/>
                        })
                    }
                    {this.state.selectedEvent ? (
                        <EventPopUp selectedEvent={this.state.selectedEvent} 
                        ClosePopUp={this.handlerClosePopUp}/>
                    ): null }
                    {this.state.newFormToggle ? (
                        <CreateNewEvent handlerCreateEvent={this.handlerCreateEvent}/>
                    ): null }
                    <UserLocation userArea={this.state.userArea}/>
                </ReactMapGL>
            </div>
        )
    }
}