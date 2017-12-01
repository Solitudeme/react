import React from "react";
import "./index.scss";
import {NavLink} from "react-router-dom";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";


class App extends React.Component{
    constructor(){
        super();
        this.state={
            show:false
        }

    }

    render(){
        return <div>
            {
                //点击navbar显示和影藏侧边栏
            }
            <Navbar event={()=>{
                //console.log("111");
                this.setState({
                    show:!this.state.show
                })
            }}></Navbar>
            {
                //点击sidebar里面的按钮就false消失
            }
            <Sidebar isshow={this.state.show} event={()=>{
                //console.log("111");
                this.setState({
                    show:false
                })
            }}></Sidebar>



            {
                //下面是存放子组件的位置
            }
            <section>
            {
                this.props.children
            }
            </section>
        </div>
    }
}

export default App;
