import {AlignObject} from "highcharts/highcharts.src";

export type Chart = {
    type: string
}
export type Title = {
    text: string
    align: string
}
export type XAxis = {
    categories: string[]
}
export type YAxis = {
    allowDecimals: boolean,
    min: number,
    title: {
        text: string
    }
}
export type PlotOptions = {
    column: {
        stacking: string,
    }
}
export type Tooltip = {
    format: string,
    formatter: () => AlignObject
}