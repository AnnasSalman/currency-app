import styled from 'styled-components';
import {Chip} from '@mui/material';

interface Props {
    customColor: string;
}

export const StyledChip = styled(Chip)<Props>`
    &&.MuiChip-outlined{
        color: ${props => props.customColor || "palevioletred"};
        border-color: ${props => props.customColor || "palevioletred"};
        margin: 0.4vh 0.3vw;
    }
`