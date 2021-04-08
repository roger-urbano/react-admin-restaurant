import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { signOutAction } from '../../redux/actions/auths/logout/logoutAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
	bgWrapper: {
	//   backgroundColor: theme.palette.background.default,
	  backgroundColor: theme.palette.action.hover,
	  minHeight: '100vh'
	},
  }));

const PrivateLayout = ( props ) => {
	console.log('Render PrivateLayout');
	const dispatch = useDispatch();
	const history = useHistory();

	const classes = useStyles();  // Estilos peronalizado contenedor

	const handleSignOutClick = () => {
		dispatch(signOutAction(history))
	}
	  
	return (
		<Grid container justify="center" spacing={0}>
			<Grid item={true} xs={3}>
			  <Paper>
				Barra lateral fixed
			  </Paper>
			</Grid>
			<Grid item={true} xs={9} className={classes.bgWrapper}>
				<Box boxShadow={1} p={1} bgcolor="common.white" justifyContent="flex-end" display="flex">
					<Button  color="secondary" fullWidth={false} onClick={handleSignOutClick}>
						Cerrar sesión
					</Button>
				</Box>
				<Box  px={8} py={4} >
					{props.children}
			  	</Box>
			</Grid>
		</Grid>
	)
} 

export default PrivateLayout