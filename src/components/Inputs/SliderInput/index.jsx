import { Slider, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function SliderInput({setParentYearRange}){
  return (
    <div>
      <Slider 
        min={1985}
        max={2021}
        defaultValue={2021}
        onChange={(x) => setParentYearRange([x, x])}
      />

      <RangeSlider 
        min={1985}
        max={2021}
        defaultValue={[1985, 2021]}
        onChange={(x) => setParentYearRange(x)}
      />
    </div>
  )
} 