import React from "react";
import "./index.scss";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";

class Film extends React.Component {
    constructor() {
        super();
        this.state={
            
        }
    }

    render() {
        return <div id="film">
            
            <ul className="filmheader">
                <li>
                    <NavLink to="/film/nowplaying" >正在热映</NavLink>
                </li>
                <li>
                    <NavLink to="/film/comingsoon" >即将上映</NavLink>
                </li>
            </ul>

            {
                this.props.children
            }
        </div>
    }
}

export default Film;
