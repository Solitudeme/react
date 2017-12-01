import React from "react";
import "./index.scss";

class Nowplaying extends React.Component {
    constructor() {
        super();
        this.state = {
            datalist:[]
        }
    }

    componentDidMount(){
        axios.get("/v4/api/film/now-playing?page=1&count=7").then(res=>{
            console.log(res.data)
            this.setState({
                datalist:res.data.data.films
            })
            
        })
    }

    render() {
        

        return <div id="nowplaying">
            <ul >

                {
                    this.state.datalist.map(item=>
                        <li key={item.id} onClick={this.handleClick.bind(this,item.id)}>
                            <img src={item.poster.origin} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.intro}</p>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div> 
    }

    handleClick(id){
        //编程式跳转页面
        this.props.history.push(`/detail/${id}`);
    }
}

export default Nowplaying;
