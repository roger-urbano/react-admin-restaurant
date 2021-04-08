import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	bgLogin: {
	  backgroundColor: theme.palette.primary.main,
	  color: 'white',
	  height: '100vh',
	  padding: '20px'
	},
	marginBottom: {
		marginBottom: theme.spacing(2),
	  },
  }));

const PublicLayout = ( props ) => {

    const classes = useStyles();  // Estilos peronalizado contenedor
    console.log('Render PublicLayout')
    return ( 
        <Grid container justify = "center" spacing={0} >
            {/* <Grid item={true} xs={12} >
                <Paper> </Paper> 
            </Grid> */}
            <Grid
                item={true}
				container
                xs={12}
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.bgLogin}
			>
                 { props.children }
            </Grid>
        </Grid>
    );
}

export default PublicLayout