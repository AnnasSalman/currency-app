import styled from 'styled-components';

interface Props{
    value: number;
}

export const PercentageChangeText = styled.div<Props>`
    color: ${props => props.value <= 0 ? 'green' : 'red'};
    font-weight: bold;
`