import * as d3 from "d3"

export default class DataGrabber {
    static async fetchDataset(url) {
        const response = await d3.csv(url);
        // console.warn(response)
        return response;
    }
}