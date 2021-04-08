import { createMuiTheme } from '@material-ui/core/styles';

/*
Crear tema personalizoado de Material y 
cambiar tipo de fuente en la propiedad "typography" 
con fuente raleway descargada y usando @font-face
*/ 


export const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff",
        },
        background: {
            paper: "#fff",
            default: "#fafafa"
        },
        primary: {
            light: "rgba(169, 229, 37, 1)",
            main: "rgba(147, 213, 0, 1)",
            dark: "rgba(134, 191, 10, 1)",
            contrastText: "#fff"
        },
        secondary: {
            light: "rgba(246, 133, 69, 1)",
            main: "rgba(255, 95, 0, 1)",
            dark: "rgba(223, 84, 3, 1)",
            contrastText: "#fff"
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        },
        // action: {
        //     hover: "blue",
        // }
    },
    typography: {
        fontFamily: ['"Raleway"', 'Open Sans'].join(',')
    }
  });