import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './shared/theme'
import AppRouter from './router/Router';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


// import 'fontsource-roboto';

function App() {
  return (
      <div className="App">
      <ThemeProvider theme={theme}>
        <AppRouter/>  
      </ThemeProvider>
    </div>
  );
}

export default App;