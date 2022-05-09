export default class dataOrganizer{
    
    //Sort three arrays based in first array descendent order
    static putThreeInDescendingOrder(dataset, labels, colors){
        let finalDataset = [...dataset];
        let finalLabels = [...labels];
        let finalColors = [...colors];

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
        return [finalDataset, finalLabels, finalColors];
    }
    
    //extract the four highest values ​​and merge remaining into "Other"
    static putIntoFiveSets(dataset, labels, colors){
        let otherCountries = 0;   
        
        //extracting four highest values
        let finalDataset = dataset.slice(0,4);
        let finalLabels = labels.slice(0,4);
        let finalColors = colors.slice(0,4);

        //calculating "Other" (sum of four lowest values)
        let othersDataset = dataset.slice(4,8);
        otherCountries = othersDataset.reduce((a, b) => (+a) + (+b), 0);

        //adding "Other" (sum of four lowest values)
        finalDataset.push(otherCountries);
        finalLabels.push("Other");
        finalColors.push("Gray");
        
        return [finalDataset, finalLabels, finalColors];
    }
}