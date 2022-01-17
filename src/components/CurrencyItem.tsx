import React from 'react';
import {TableRow, TableCell, Checkbox} from '@mui/material'

import {PercentageChangeText} from './styled/PercentageChangeText';
import {GainLossStatContainer, GainLossStat} from './styled/GainLossStat';

interface IProps{
    name: string;
    value: number;
    selected: boolean;
    percentageChange: number;
    valueChange: number;
    onChange: () => void;
}

export const CurrencyItem: React.FC<IProps> = ({
    name, 
    value, 
    selected, 
    percentageChange, 
    valueChange, 
    onChange
}) => {
    return(
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={selected}
                    onChange={onChange}
                />
            </TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{value}</TableCell>
            <TableCell align="right" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <PercentageChangeText value={valueChange}>
                    {valueChange}
                </PercentageChangeText>
                <GainLossStatContainer>
                    <GainLossStat value={valueChange} total={value}/>
                </GainLossStatContainer>
            </TableCell>
            <TableCell align="right">
                <PercentageChangeText value={percentageChange}>
                    {percentageChange}%
                </PercentageChangeText>
            </TableCell>
        </TableRow>
    )
}