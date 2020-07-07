import React from 'react'
import { Redirect } from 'react-router-dom'

export default class seasonPick extends React.Component{
    state = {
        summerPick: false,
        winterPick: false
    }

    handlerRedirect = () =>{
        if(sessionStorage.getItem("userId") === null){
            return <Redirect to='/'/> 
        }else if(this.state.summerPick){
            return <Redirect to='/summer'/>
        }else if(this.state.winterPick){
            return <Redirect to='/winter'/>
        }
    }

    handlerSummerClick = () => {
        // console.log('summer')
        this.setState({ summerPick: true})
    }

    handlerWinterClick = () => {
        // console.log('winter')
        this.setState({ winterPick: true})
    }

    render(){
        return(
            <div>
                {this.handlerRedirect()}
                <div className="wrapper">
                    <div className="winter">
                        <img alt='winterImg' className="winterImg" 
                        src={'https://i.gifer.com/Dv9E.gif'} 
                        onClick={this.handlerWinterClick}/>
                    </div>
                    <div className="summer">
                        <img alt='summerImg' className="summerImg" 
                        src={'https://thumbs.gfycat.com/FairImmaterialCatbird-size_restricted.gif'} 
                        onClick={this.handlerSummerClick}/>
                    </div>
                </div>
                    <div className='seasonPickText'>
                        <p>
                            Winter or Summer activities? 
                        </p>
                        <p>
                            The choice is yours!
                        </p>
                    </div>
            </div>
        )
    }
}