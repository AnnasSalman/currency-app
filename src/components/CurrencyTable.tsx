import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {CurrencyItem} from '../components/CurrencyItem';
import {Heading4} from '../components/styled/Heading4';

interface IProps{
    currencyValues: {
        currency: string; 
        value: number;
        percentageChange: number;
        valueChange: number;
    }[];
    currencyHistories: {
        date: string;
        currencies: {
            currency: string; 
            value: number;
        }[] 
    }[];
    selectedCurrencies: string[];
    onCheckboxChange: (currencyName: string) => void;
    baseCurrency: string | unknown;
} 

const CurrencyTable: React.FC<IProps> = ({
    currencyValues,
    selectedCurrencies, 
    onCheckboxChange,
    baseCurrency
}) => {
    const tableColumnHeadings = [
        ' ',
        'Currency',
        `Value (for one ${baseCurrency})`,
        'Gain/Loss (One Month)',
        'Percentage Change in value',
    ]; 
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            tableColumnHeadings.map((tableColumnHeading) => (
                                <TableCell align="right">
                                    <Heading4>
                                        {tableColumnHeading}
                                    </Heading4>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            currencyValues.map((currencyItem, index) => {
                                return (
                                    <CurrencyItem
                                        key={currencyItem.currency}
                                        name={currencyItem.currency}
                                        value={currencyItem.value}
                                        valueChange={parseFloat(currencyItem.valueChange.toFixed(3))}
                                        percentageChange={currencyItem.percentageChange}
                                        selected={selectedCurrencies.includes(currencyItem.currency)}
                                        onChange={() => onCheckboxChange(currencyItem.currency)}
                                    />
                                )
                            })
                        }
                    </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CurrencyTable;