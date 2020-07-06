import React from 'react'
import { Marker, Popup } from 'react-map-gl'

export default class UserLocation extends React.Component{
    state = {
        userLocation: [],
        popupToggle: false
    }

    componentDidMount(){
        fetch(`https://discover.search.hereapi.com/v1/discover?in=circle:40.7533,-73.9069;r=13000&q=${sessionStorage.getItem('zipcode')}&apiKey=BAMub3z8qQq1pGLTfj7NFtP4qbz8BcKuukeljc03ikI`)
        .then(resp => resp.json())
        .then(userLocationData => this.setState ({ userLocation: userLocationData.items}) )
    }

    handlerPopUpShow = () => {
        this.setState({ popupToggle: !this.state.popupToggle})
    }

    render(){
        return(
            <div>
            {this.props.userArea ? 
                <Marker
                    latitude={this.state.userLocation[0].position.lat}
                    longitude={this.state.userLocation[0].position.lng}>
                    <button className='markerBtnUser' 
                        onClick={this.handlerPopUpShow}>
                        <img alt='User location' 
                        src='https://pngimage.net/wp-content/uploads/2018/06/here-icon-png-3.png'/>
                    </button>
                </Marker>
            : null }

            {this.state.popupToggle ? 
                <Popup latitude={this.state.userLocation[0].position.lat} 
                    longitude={this.state.userLocation[0].position.lng}
                    >
                    <div>
                        <button className='popUpClose' 
                            onClick={this.handlerPopUpShow}><strong>x</strong>
                        </button>
                        <h2>{this.state.userLocation[0].address.label}</h2>
                    </div>
                </Popup>
            : null }

            </div>
        )
    }
}