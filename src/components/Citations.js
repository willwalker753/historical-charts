import React from "react";
import { citations } from "../util/constants";

const Citations = () => {
    return (
       <div>
            <h3>Citations:</h3>
            {citations.map(item => {
                return(
                    <p key={item.chartName}>
                        <strong>"{item.chartName}"</strong>&nbsp;
                        <em>
                            {item.desc}&nbsp;Retrieved from&nbsp;
                            <a href={item.link} target="_blank" rel="noreferrer" >
                                {item.link}
                            </a>
                        </em>
                    </p> 
                );
            })}
        </div>
    );
}

export default Citations;
