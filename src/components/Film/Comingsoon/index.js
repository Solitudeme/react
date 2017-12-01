import React from "react";
import "./index.scss";
import {connect} from "react-redux";

class Comingsoon extends React.Component {
    constructor() {
        super();
        this.state={
            soonlist:[]
        }
    }
    componentDidMount(){

        if(this.props.soonlist.length==0){
            this.props.getCominsoon();
        }
       
        
    }

    render() {
        return <div id="comingsoon">

                <ul>
                    {
                        this.props.soonlist.map(item=>
                            <li key={item.id}>
                                {
                                   item.poster? <img src={item.poster.origin} />:<img src={item.coverPicture} />
                                }
                                
                                <div>
                                    <h3>{item.name}</h3>
                                    
                                    {
                                        item.poster? <p>{item.intro}</p>:<p>{item.cityPlace}</p>
                                    }
                                </div>
                            </li>
                        )
                    }
                </ul> 

            
        </div>
    }
}

export default connect(
        (state)=>{
            console.log(state);
            return{
                soonlist:state.list
            }
        },
        {
            getCominsoon:()=>{
                //异步action 借助 redux-thunk 中间件实现的
                return (dispatch)=>{
                    axios.get("v4/api/film/coming-soon?page=1&count=7").then(res=>{
                        console.log(res.data.data.films);
                        /*this.setState({
                            soonlist:res.data.data.films
                        })*/

                        dispatch({
                            type:"comingsoonlist",
                            payload:res.data.data.films
                        })
                    })
                }

               
            }
        }
    )(Comingsoon);
