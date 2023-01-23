import React from "react";
import "./index.css"

const SinglePost = ({ pantone, year, name, color}) => {
    const background = {
        backgroundColor: color
    };
    return(
        <div className="single_post" style={background}>
            <p>{name}</p>
            <p>{year}</p>
            <p>{pantone}</p>
        </div>
    )
}
export default SinglePost