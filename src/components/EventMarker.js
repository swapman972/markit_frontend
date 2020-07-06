import React from 'react';
import {Marker} from "react-map-gl"

export default class EventPopUp extends React.Component{

    imgForCategory = (event) => {
        switch (event.category) {
            case 'Train Station':
                return <img alt='Train Station' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MTA_NYC_logo.svg/931px-MTA_NYC_logo.svg.png'/>
            case 'Event':
                return <img alt='Event' src='https://i7.pngguru.com/preview/810/104/889/free-content-computer-icons-clip-art-event-cliparts.jpg'/>
            case 'Ice Cream':
                return <img alt='Ice Cream' src='https://cdn.shopify.com/s/files/1/1010/9416/products/0693-LSTK.png?v=1570470352'/>
            case 'Rooftop':
                return <img alt='Rooftop' src='https://cdn1.iconfinder.com/data/icons/buildings-landmarks-set-2/96/Roof-512.png'/>
            case 'Museum':
                return <img alt='Museum' src='https://www.logolynx.com/images/logolynx/40/40f932b71da3106d1a6bdd1fbcd3dd98.png'/>
            case 'Art':
                return <img alt='Art' src='https://www.freepnglogos.com/uploads/hot-air-balloon-png/hot-air-balloon-tux-paint-stamp-browser-vehicles-19.png'/>
            case 'Swimming Pool':
                return <img alt='Swimming Pool' src='https://www.freepnglogos.com/uploads/water-png/health-benefits-water-morgan-genus-10.png'/>
            case 'BBQ':
                return <img alt='BBQ' src='https://www.freepnglogos.com/uploads/barbecue-png/barbecue-png-images-transparent-download-pngmartm-19.png'/>
            case 'Park-recreation':
                return <img alt='Park-recreation' src='https://www.freepnglogos.com/uploads/tree-png/large-green-tree-picture-2.png'/>
            case 'City Bike':
                return <img alt='City Bike' src='https://www.freepnglogos.com/uploads/cyclist-png/cyclist-bicycle-bicyclist-vector-graphic-pixabay-12.png'/>
            case 'Ramen':
                return <img alt='Ramen' src='https://www.freepnglogos.com/uploads/pasta-png/dish-pasta-spaghetti-icon-food-iconset-icons-land-17.png'/>
            case 'Soup':
                return <img alt='Soup' src='https://www.freepnglogos.com/uploads/soup-png/soup-feast-big-chef-slot-royal-vegas-online-casino-0.png'/>
            case 'Coffee Shop':
                return <img alt='Coffee Shop' src='https://www.freepnglogos.com/uploads/coffee-logo-png/estella-revenge-stuff-week-coffee-confections-1.png'/>
            case 'Ice Rink':
                return <img alt='Ice Rink' src='https://www.freepnglogos.com/uploads/snowflake-png/snowflake-snow-cold-image-pixabay-7.png'/>
            case 'Holiday Market':
                return <img alt='Holiday Market' src='https://www.freepnglogos.com/uploads/christmas-png/christmas-bell-png-transparent-images-png-only-1.png'/>
            default:
                break;
        }
    }

    render(){
        return(
            <Marker key={this.props.event.id}
                latitude={this.props.event.lat}
                longitude={this.props.event.lng}>
                <button className='markerBtn' 
                onClick={() => this.props.handlerEventClick(this.props.event)}>
                    {this.imgForCategory(this.props.event)}
                </button>
            </Marker>
        )
    }
}