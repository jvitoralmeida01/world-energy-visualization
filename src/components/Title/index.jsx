import React from "react";

export default function Title({text}){
    return (
        <div className="title-box">
            <h1 className="title-text">{text}</h1>
        </div>
    );
}