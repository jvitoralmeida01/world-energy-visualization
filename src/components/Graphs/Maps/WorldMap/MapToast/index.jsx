import React, {useEffect, useRef} from "react";
import gsap from "gsap";

export default function MapToast({alert, country}){

    const alertRef = useRef();

    useEffect(() => {
        if(alert){
            gsap.fromTo(alertRef.current, 
                {
                    translateX: -100,
                    opacity : 0,
                    display: "flex",
                    transform: "scale(1)"
                },  
                {
                    duration: 0.5, 
                    ease: "back.out(1.7)",
                    translateX: 0, 
                    opacity: 1,
                    transform: "scale(1)"
                }
            );
        }else{
            gsap.fromTo(alertRef.current, 
                { 
                    translateX: 0, 
                    opacity: 1,
                    transform: "scale(1)"
                },  
                {
                    delay: 1,
                    duration: 0.5, 
                    ease: "back.in(1.7)",
                    translateX: 0, 
                    opacity: 0,
                    transform: "scale(0)",
                    display: "none"
                }
            );
        }
        
    }, [alert])

    return(
        <div ref={alertRef} style={{
            position: "absolute", 
            opacity: 0,
            backgroundColor: "#884444",
            padding: "15px",
            borderRadius: "10px",
        }}>
            <h2>This country was already selected on another group</h2>        
        </div>
    );
}