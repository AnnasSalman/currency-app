import styled from 'styled-components';
import {TextField, Autocomplete} from '@mui/material';

export const CustomAutoComplete = styled(Autocomplete)`
    margin-left: 15px;
`

export const CustomTextField = styled(TextField)`
    & label.Mui-focused {
        color: white;
    }
    & .MuiOutlinedInput-root {
    border-color: white;
        &.Mui-focused fieldset {
            border-color: white;
        }
  }
`