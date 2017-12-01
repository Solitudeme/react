import React from "react";
import "./index.scss";
import { connect } from "react-redux";

class Detail extends React.Component {
    constructor() {
        super();
        this.state={
            filminfo:null
        }

    }

    componentWillMount(){
        //console.log(this.props.match.params.solitudeid);
        axios.get(`/v4/api/film/${this.props.match.params.solitudeid}?__t=1511943827308`).then(res=>{
            //console.log(res.data);
            this.setState({
                filminfo:res.data.data.film
            })
            this.props.changeCard(res.data.data.film.name);
        })
        console.log(window.localStorage.cart)
        if(!window.localStorage.cart){
            window.localStorage.cart = JSON.stringify([])
        }
    }




    render() {
        //console.log(this.state.filminfo);
        return <div>
            {
                this.state.filminfo?
                <div>
                    <img src={this.state.filminfo.cover.origin}/>
                    <h3>{this.state.filminfo.name}</h3>
                    <p>{this.state.filminfo.synopsis}</p>
                </div>
                :null
            }

            <button className="btn" onClick={this.AddToCartClick.bind(this,this.state.filminfo)}>加入购物车</button>
            
        </div>
    }

    AddToCartClick(item){
        var newlist = [...JSON.parse(window.localStorage.cart)]
        var isHave = false
        for(var i=0;i<newlist.length;i++){
            if(newlist[i].id==item.id){
                newlist[i].buyNum = parseInt(newlist[i].buyNum) +1
                isHave = true
                break;
            }
        }
        if(isHave == false){
            console.log(item)
            item.buyNum = 1
            newlist.push(item)
        }
        
        window.localStorage.cart = JSON.stringify(newlist)
        console.log(JSON.parse(window.localStorage.cart))
    }
}

export default connect(
        null,
        {
            changeCard:(name)=>{
                //自动进行dispath 到 reducer
                return {
                    type:"changeCardReducer",
                    payload:name
                }
            }
        }
    )(Detail);


