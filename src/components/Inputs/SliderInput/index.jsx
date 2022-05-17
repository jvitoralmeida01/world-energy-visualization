import { Slider, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function SliderInput({setParentYearRange}){
  return (
    <div>
      <div className="slider">
        <h4>Single Year</h4>
        <Slider 
          min={1985}
          max={2021}
          defaultValue={2021}
          onChange={(x) => setParentYearRange([x, x])}
        />
      </div>

      <div className="slider">
        <h4>Year Range</h4>
        <RangeSlider 
          min={1985}
          max={2021}
          defaultValue={[1985, 2021]}
          onChange={(x) => setParentYearRange(x)}
        />
      </div>
    </div>
  )
} 