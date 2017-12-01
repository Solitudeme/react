import React from "react";
import "./index.scss";
import "@/assets/iconfont/iconfont.css";
import {Provider} from "react-redux";
import { connect } from "react-redux";

class Navbar extends React.Component {
    constructor() {
        super();
        this.state={
            
        }

    }

    render() {
        return <nav>
            <div className="left">
                <i className="iconfont icon-all" onClick={this.handleClick.bind(this)}></i>
                <span>{this.props.title}</span>
            </div>

            <div className="left">
                <input className="txt" type="text" placeholder="搜索" ref="keyword"/>
                <button className="seach" onClick={this.seachClick.bind(this)}>搜索</button>
            </div>

            <div className="rightte">

                <span>杭州</span>
                <i className="iconfont icon-account"></i>
            </div>

            
        </nav>
    }

    handleClick(){
        //点击调用父组件的回调函数
        this.props.event();
    }

    seachClick(){
        var keyword = this.refs.keyword.value;
        console.log(keyword);
        axios.get('/app2/perform/search?page=1&pageSize=10&keyword='+keyword).then(res=>{
            console.log(res.data.data[0].content);
            this.props.getCominsoon(res.data.data[0].content);
            
        })

    }



}

export default connect(
        (state)=>{
            //console.log(state)
            return {
                title:state.title
            }
        },
        {
            getCominsoon:(data)=>{
                //自动进行dispatch 到 reducer
                return {
                    type:"comingsoonlist",
                    payload:data
                }
            }
        }
    )(Navbar);
