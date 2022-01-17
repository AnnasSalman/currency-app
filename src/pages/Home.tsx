import React, {useState} from 'react';
import { useQuery } from 'react-query';
import moment from 'moment'

import currencyOptions from '../constants/currencyOptions';

import CurrencyTable from '../components/CurrencyTable';
import CurrencyChart from '../components/CurrencyChart';
import {PageHeader} from '../components/styled/PageHeader';
import {CustomTextField, CustomAutoComplete} from '../components/styled/CustomTextField';


// Get a random color hex code
const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Get current date and the starting date based on the number of months to go back in history 
const getDatesForHistoricalDataFetch = (months: number): string[] => {
    return[
        moment().format('YYYY-MM-DD'),
        moment().subtract(1, 'months').format('YYYY-MM-DD'),
    ];
}

// Vanilla splice meyhod but without mutuating the original array  
const spliceNoMutate = (myArray: any, indexToRemove: number): [] => {
    return myArray.slice(0,indexToRemove).concat(myArray.slice(indexToRemove+1));
}

const Home = () => {

    const [selectedCurrencies, setSelectedCurrencies] = useState([
        {currency: 'PKR', color: '#14542f'},
    ]);
    const [baseCurrency, setBaseCurrency] = useState<string | unknown>('USD')
    const { 
        isLoading: currencyLiveIsLoading,
        error: currencyLiveError,
        data: currencyLiveData 
    } = useQuery(
        ['currencyLiveData', baseCurrency],
        () => fetch(`https://freecurrencyapi.net/api/v2/latest?base_currency=${baseCurrency}&apikey=15ea9e70-71e1-11ec-a2c3-afbb6b3d1b76`).then(res => res.json()),
        {}
    );

    const onDeleteSelectedCurrencyItem = (index: number) => {
        setSelectedCurrencies(spliceNoMutate(selectedCurrencies, index));
    }

    const onCurrencyCheckboxChange = (currency: string) => {
        const selectedCurrenciesSimplified = selectedCurrencies.map(currencyItem => currencyItem.currency)
        const index = selectedCurrenciesSimplified.indexOf(currency);
        if (index > -1) {
            setSelectedCurrencies(spliceNoMutate(selectedCurrencies, index));
        }
        else{
            setSelectedCurrencies([...selectedCurrencies, {
                currency,
                color: getRandomColor(),
            }])
        }
    }

    const { isLoading: currencyHistoricalIsLoading, error: currencyHistoricalError, data: currencyHistoricalData } = useQuery(
        ['currencyHistoricalData', baseCurrency],
         () => fetch(`https://freecurrencyapi.net/api/v2/historical?base_currency=${baseCurrency}&date_from=${getDatesForHistoricalDataFetch(1)[1]}&date_to=${getDatesForHistoricalDataFetch(1)[0]}&apikey=15ea9e70-71e1-11ec-a2c3-afbb6b3d1b76`).then(res =>
            res.json()
        ),
    );

    if(currencyLiveError || currencyHistoricalError) return <div>error...</div>

    if(currencyLiveIsLoading || currencyHistoricalIsLoading) return <div>loading...</div>

    return(
        <div>
            <PageHeader>
                Currency Values
                <CustomAutoComplete
                    disablePortal
                    value={baseCurrency}
                    fullWidth={true}
                    onChange={(event, newValue: unknown) => {
                        console.log(newValue);
                        newValue ? setBaseCurrency(newValue): setBaseCurrency(baseCurrency);
                    }}
                    options={currencyOptions}
                    sx={{ width: '300px'}}
                    renderInput={(params) => <CustomTextField {...params} label="Base Currency" />}
                />
            </PageHeader>
            <CurrencyChart
                graphData={selectedCurrencies.map((currencyItem) => {
                    return {
                        name: currencyItem.currency,
                        color: currencyItem.color,
                        record: Object.keys(currencyHistoricalData.data).map((date: string) => {
                            return {
                                value: currencyHistoricalData.data[date][currencyItem.currency],
                                date: date,
                            }
                        })
                    }
                })}
                dataTimeDuration={Object.keys(currencyHistoricalData.data).length}
                onDelete={(index) => onDeleteSelectedCurrencyItem(index)}
            />
            <CurrencyTable
                currencyValues={Object.keys(currencyLiveData.data).map((currency: string) => {
                    const allDates = Object.keys(currencyHistoricalData.data)
                    const valueChange = currencyHistoricalData.data[allDates[allDates.length - 1]][currency] - currencyHistoricalData.data[allDates[0]][currency]
                    const percentageChange = (valueChange / currencyLiveData.data[currency]) * 100;
                    return {
                        currency: currency,
                        value: currencyLiveData.data[currency],
                        percentageChange: parseFloat(percentageChange.toFixed(2)),
                        valueChange,
                    }
                })}
                currencyHistories={Object.keys(currencyHistoricalData.data).map((date)=>{
                    return {
                        date,
                        currencies: Object.keys(currencyHistoricalData.data[date]).map((currency)=>{
                            return {
                                currency: currency,
                                value: currencyHistoricalData.data[date][currency]
                            }
                        })
                    }
                })}
                selectedCurrencies={selectedCurrencies.map((currencyItem)=>currencyItem.currency)}
                onCheckboxChange={(currencyName) => onCurrencyCheckboxChange(currencyName)}
                baseCurrency={baseCurrency} 
            />
        </div>
    )
}

export default Home;