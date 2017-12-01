import React from "react";
import "./index.scss";
import axios from "axios";
import ReactSwipe from 'react-swipe';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Home extends React.Component {
    constructor() {
        super();
        this.state={
            looplist:[],
            mainlist:[],
            pagelist:1,
            seachlist:[]
        }

    }

    componentWillMount(){
        axios.get("v4/api/billboard/home").then(res=>{
            //console.log(res.data);
            this.setState({
                looplist:res.data.data.billboards
            })
        }),

        axios.get(`/v4/api/film/now-playing?page=${this.state.pagelist}&count=5`).then(res=>{
            //console.log(res.data);
            this.setState({
                mainlist:res.data.data.films
            },()=>{
                //console.log(this.state.mainlist)
            })
        })

        //http://api2.heyhou.com/app2/perform/search?page=1&pageSize=10&keyword=
        //
        axios.get('/app2/perform/search?page=1&pageSize=10&keyword=').then(res=>{
            console.log(res.data.data[0].content);
            
        })
    }

    componentDidMount(){
        
    }

    render() {

        var filmlist=(()=>{
                var list=[];
                for(var i in this.state.mainlist){
                    //console.log(this.state.mainlist[i]);
                    list.push(
                        <NavLink to="/film" key={i} className="navlink">
                        <div key={this.state.mainlist[i].id} className="pad" onClick={this.divClick.bind(this)}>
                            <img src={this.state.mainlist[i].cover.origin} className="image"/>
                            <p>{this.state.mainlist[i].name}</p>
                            <span>{this.state.mainlist[i].cinemaCount}家影院上映</span>
                            <span>{this.state.mainlist[i].watchCount}人购票</span>
                        </div>
                        </NavLink>
                    )
                }
                return list;
            })()

        return <div>

            <ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}} key={this.state.looplist.length}>
                {
                    this.state.looplist.map((item,index)=>
                        <img src={item.imageUrl} key={index}/>
                    )
                    
                }
            </ReactSwipe>
            <div className="bot">
                {filmlist}
            </div>

            <button onClick={this.variationClick.bind(this)}>上一页</button>
            <button onClick={this.changeClick.bind(this)}>下一页</button>
            
        </div>
    }

    changeClick(){
        //console.log(this.state.pagelist)
        this.setState({
            pagelist:this.state.pagelist+1
        })

        axios.get(`/v4/api/film/now-playing?page=${this.state.pagelist}&count=5`).then(res=>{
            //console.log(res.data);
            this.setState({
                mainlist:res.data.data.films
            },()=>{
                //console.log(this.state.mainlist)
            })
        })
    }

    variationClick(){
        //console.log(this.state.pagelist)
        this.setState({
            pagelist:this.state.pagelist-1
        })

        axios.get(`/v4/api/film/now-playing?page=${this.state.pagelist}&count=5`).then(res=>{
            //console.log(res.data);
            this.setState({
                mainlist:res.data.data.films
            },()=>{
                //console.log(this.state.mainlist)
            })
        })
    }

    divClick(){
        console.log("111");
    }
}

export default connect(
        (state)=>{
            console.log(state);
            return{
                seachlist:state.list
            }
        },
        {
            getSeach:()=>{
                //异步action 借助 redux-thunk 中间件实现的
                return (dispatch)=>{
                    axios.get("/app2/perform/search?page=1&pageSize=10&keyword=").then(res=>{
                        console.log(res.data);
                        /*this.setState({
                            soonlist:res.data.data.films
                        })*/

                        dispatch({
                            type:"comingsoonlist",
                            payload:res.data.data[0].content
                        })
                    })
                }

               
            }
        }
    )(Home);;
