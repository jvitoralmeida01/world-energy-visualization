
export default class datasetFilter {
    //Filter dataset with the given country    
    static filterByCountry(dataset, country){
        let filtredData = dataset.filter((d) => {
            return (d.country == country);
        });
        return filtredData;
    }

    //Filter dataset with year range    
    static filterByYear(dataset, yearRange){
        let filtredData = dataset.filter((d) => {
            return (d.year >= yearRange[0] && d.year <= yearRange[1]);
        });
        return filtredData;
    }

    //Filter dataset with given labels 
    static filterByLabels(dataset, labels){
        let wantedData = [];
        for (let i = 0; i < labels.length; i++){
            let column = labels[i];
            wantedData.push(dataset[0][column])
        }
        return wantedData;
    }

}