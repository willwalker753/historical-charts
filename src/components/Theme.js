import React from "react";
import "../styles/theme.css";

const Theme = props => {
    return (
        <div id="theme-container">
            <i className="fas fa-sun" />
            <form>
                <label className="switch" >
                    <input type="checkbox" defaultChecked="true" onChange={props.toggleTheme}/>
                    <span className="slider round" />
                </label>
            </form>
            <i className="fas fa-moon" />
        </div>
    )
}

export default Theme;
