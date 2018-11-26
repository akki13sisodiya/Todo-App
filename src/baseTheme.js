import { createMuiTheme } from '@material-ui/core/styles';
import {
    blue,
    darkBlack,
    fullBlack,
    grey,
    red,
    white,
} from '@material-ui/core/colors';


const baseTheme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue[600],
        primary2Color: blue[700],
        primary3Color: grey[400],
        accent1Color: red[600],
        accent2Color: grey[100],
        accent3Color: grey[500],
        textColor: darkBlack,
        alternateTextColor: white,
        borderColor: grey[300],
        labelColor: '#7e7e7e',
        secondaryTextColor: '#1AA0E4',
        pickerHeaderColor: blue[600],
        shadowColor: fullBlack,
    },
    textField: {

    },
    typography: {
        useNextVariants: true,
    },
});

export default baseTheme;
