import React from "react";

export default function Title({text}){
    return (
        <div className="title-box">
            <h3 className="title-text">{text}</h3>
        </div>
    );
}