import React from "react";
import "./index.scss";

class Card extends React.Component {
    constructor() {
        super();
        this.state={
            list:[]
        }

    }

    componentWillMount(){
        this.setState({
            list: JSON.parse(window.localStorage.cart)
        })
    }

    render() {
                
        var listdata = [];

        for(var i=0;i<this.state.list.length;i++){
            listdata.push(
                <div key={i} id="cart">
                    <div className="left">
                        <img src={this.state.list[i].cover.origin} className="cartimg"/>
                    </div>
                    <div className="right">
                        <p className="title">{this.state.list[i].name}</p>
                        <p className="num">{this.state.list[i].buyNum}张</p>
                        <button className="del" onClick={this.delClick.bind(this,this.state.list[i].id)}>删除</button>
                    </div>
                </div>
            );

        }


        return <div>
        

            {listdata}
        </div>
    }

    delClick(id){
        /*let storage = window.localStorage;
        storage.cartinfo = JSON.stringify([]);
        this.setState({
            infon:[]
        })*/
        var list=[];
        list=[...JSON.parse(window.localStorage.cart)];
        for(var i=0;i<list.length;i++){
            if(list[i].id==id){
                list.splice(i,1)
            }
        }
        this.setState({
            list:list
        })
 
        window.localStorage.cart=JSON.stringify(list)

        

    }
}

export default Card;
