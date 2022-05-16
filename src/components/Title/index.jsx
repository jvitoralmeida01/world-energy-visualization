import React from "react";

export default function Title({text}){
    return (
        <div className="title-box">
            <h2 className="title-text">{text}</h2>
        </div>
    );
}