import Switch from 'react-switch';
import { useState } from 'react';

export default function ButtonInput({parentAbsolute, setParentAbsolute}){

    const [selected, setSelected] = useState(parentAbsolute);

    const handleChange = (checked) => {
        setSelected(checked);
        setParentAbsolute(checked);
    }

    return (
        <div className="button-wrapper">
            <h4>{selected ? "Only Percentage" : "Absolute Value"}</h4>
            <div style={{height: '1vh'}} ></div>
            <Switch onChange={handleChange} checked={selected} 
                onColor="#fff" 
                offColor="#000"
                onHandleColor="#202020"
                offHandleColor="#ccc"
                handleDiameter={20}
                uncheckedIcon={null}
                checkedIcon={null}
                activeBoxShadow='0 0 2px 3px #fff'
            />
        </div>  
    )
} 