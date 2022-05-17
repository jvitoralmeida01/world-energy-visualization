
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
        for (let i = 0; i < dataset.length; i++){
            for (let j = 0; j < labels.length; j++){
                let column = labels[j];
                wantedData.push(dataset[i][column])
            }
        }
        return wantedData;
    }
   static filterByValidValues(dataset){
       let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
       "oil_share_elec", "solar_share_elec", "wind_share_elec"];
       for (let i = 0; i < dataset.length; i++){
        debugger
            let assimilatedValue = 0;
            for (let j = 0; j < labels.length; j++){
                let column = labels[j];
                assimilatedValue += +dataset[i][column] || 0;
            }
            if (assimilatedValue < 95){
                dataset.splice(i, 1);
                i--;
            }
        }
        return dataset;
   }
}