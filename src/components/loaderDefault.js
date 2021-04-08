import React from 'react';
import Loader from "react-loader-spinner";
import Box from '@material-ui/core/Box';



const LoaderDefault = ( props ) => {
    
    const { color, height, width, secondaryColor, timeout, heightWrap } = props;

     return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height={heightWrap}>
            <Loader
                type="Puff"
                color="rgba(147, 213, 0, 1)"
                secondaryColor="red"
                height={height}
                width={width}
                timeout={timeout}
            />
        </Box>	
    )
}

export default LoaderDefault