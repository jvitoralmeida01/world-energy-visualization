import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

let labels = [
    'Biofuel', 
    'Coal', 
    'Gas', 
    'Hydro', 
    'Nuclear', 
    'Oil', 
    'Solar', 
    'Wind'];

let colors = [ 
    'Green',
    'Red',
    'Orange',
    'Cyan',
    'Purple',
    'Black',
    'Yellow',
    'Pink',
];

export default function CountryEnergyMatrixPie({dataset}) {
    //extract the four highest values ​​and merge  remaining into "Other"
    //return dataset and their colors and labels
    function puttingInFiveSets(){
        let finalDataset = [...dataset];
        let finalLabels = [...labels];
        let finalColors = [...colors];
        let otherCountries = 0;

        //sorting dataset in ascending order
        if (finalDataset.length > 0){
            for (let i = 0; i < finalDataset.length; i++) {
                for (let j = 0; j < (finalDataset.length - i - 1); j++) {
                    if (+finalDataset[j] < +finalDataset[j + 1]) {
                        let temp = finalDataset[j];
                        finalDataset[j] = finalDataset[j + 1];
                        finalDataset[j + 1] = temp;

                        temp = finalLabels[j];
                        finalLabels[j] = finalLabels[j + 1];
                        finalLabels[j + 1] = temp;

                        temp = finalColors[j];
                        finalColors[j] = finalColors[j + 1];
                        finalColors[j + 1] = temp;
                    }
                }
            }
            //calculating "Other" (sum of four lowest values)
            console.log(finalDataset);
            let othersDataset = finalDataset.slice(4,8);
            otherCountries = othersDataset.reduce((a, b) => (+a) + (+b), 0)

            //extracting four highest values
            finalDataset = finalDataset.slice(0,4);
            finalLabels = finalLabels.slice(0,4);
            finalColors = finalColors.slice(0,4);

            //adding "Other" (sum of four lowest values)
            finalDataset.push(otherCountries);
            finalLabels.push("Other");
            finalColors.push("Gray");
        }
        return [finalDataset, finalLabels, finalColors];
    }
    let unifiedData = puttingInFiveSets();

    let finalDataset = unifiedData[0];
    let finalLabels = unifiedData[1];
    let finalColors = unifiedData[2];

    let data = {
        labels: finalLabels,
        datasets: [
            {
            label: 'Percentage of Production',
            data: finalDataset,
            backgroundColor: finalColors,
            borderColor: 'white',
            borderWidth: 1,
            },
        ],
    };
    return <Pie data={data} />;
}
