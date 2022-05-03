import * as d3 from "d3"

export default class DataGrabber {
    static async fetchDataset(url) {
        const response = await d3.csv(url);
        console.warn(response)
        return response;
    }
    static filterDataset(dataset, country) {
        let labels = ["biofuel_share_elec", "coal_share_elec", "gas_share_elec", "hydro_share_elec", "nuclear_share_elec",
        "oil_share_elec", "solar_share_elec", "wind_share_elec"];
        let wantedData = [];
        let filtredData = dataset.filter((d) => {
            return (d.country == country) && (d.year == 2000);
        });
    
        for (let i = 0; i < labels.length; i++){
        let column = labels[i];
        wantedData.push(filtredData[0][column])
        }
    
        return wantedData;
    }
}