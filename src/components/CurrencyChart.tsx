import React from 'react';
import {
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area
} from 'recharts';

import {ChipsContainer} from '../components/styled/ChipsContainer';
import {StyledChip} from '../components/styled/Chip';

interface IProps{
    graphData: {
        name: string,
        color: string,
        record: {
            value: number,
            date: string,
        }[]
    }[];
    dataTimeDuration: number,
    onDelete: ((index: number) => void), 
}

const convertToChartData = (graphData: IProps["graphData"], length: number) => {
    const chartData = [];
    for(let i = 0; i < length; i++){
        let graphPointItem: any = {}
        graphData.forEach((currency)=>{
            graphPointItem.name = currency.record[i].date;
            graphPointItem[currency.name] = currency.record[i].value
        })
        chartData.push(graphPointItem);
    }
    return chartData;
}

const CurrencyChart: React.FC<IProps> = ({graphData, dataTimeDuration, onDelete}) => {

    return(
        <>
            <ChipsContainer>
                {
                    graphData.map(({name, color}, index)=>(
                        <StyledChip
                            key={name} 
                            label={name} 
                            variant='outlined' 
                            customColor={color} 
                            onDelete={()=>onDelete(index)}
                        />
                    ))
                }
            </ChipsContainer>
            <AreaChart 
                width={window.innerWidth - 20} 
                height={350} 
                data={convertToChartData(graphData, dataTimeDuration)}
                margin={{ top: 40, right: 10, left: 10, bottom: 30 }}>
                <defs>
                    {
                        graphData.map((graphItem)=>(
                            <linearGradient id={`color${graphItem.name}`} x1="0" y1="0" x2="0" y2="1" key={graphItem.name}>
                            <stop offset="5%" stopColor={graphItem.color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor='#fff' stopOpacity={0}/>
                            </linearGradient>
                        ))
                    }
                </defs>
                <XAxis dataKey="name" fontSize={0}/>
                <YAxis />
                <Tooltip />
                {
                    graphData.map((graphItem)=>{
                        return(
                            <Area
                                key={graphItem.name} 
                                type="monotone" 
                                dataKey={graphItem.name} 
                                stroke={graphItem.color} 
                                fillOpacity={1} 
                                fill={`url(#color${graphItem.name})`} 
                            />

                        )
                    })
                }
            </AreaChart>
        </>
    )
}

export default CurrencyChart;