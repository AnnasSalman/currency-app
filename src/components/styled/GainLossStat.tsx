import styled from 'styled-components';

interface Props{
    value: number,
    total: number,
}

export const GainLossStat = styled.div<Props>`
    width: ${props => (Math.abs(props.value) / props.total) * 800}%;
    height: 100%;
    background-color: ${props => props.value < 0 ? 'green' : 'red'};
    border-radius: 10px;
`

export const GainLossStatContainer = styled.div`
    width: 80px;
    height: 10px;
    background-color: lightgray;
    margin-left: 10px;
    border-radius: 10px;
    overflow: hidden;
`