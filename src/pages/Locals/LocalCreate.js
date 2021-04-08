import  React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import  Grid  from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import "./index.scss";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useParams } from "react-router";



import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import imgPhoto from '../../assets/images/icon-add-photo.svg';
import { localDetailAction } from '../../redux/actions/locals/localsAction';

const LocalDetail = ( ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const dataLocal = useSelector((state)=> state.locals.local);
    const { id } = useParams();

    useEffect(() => {
		dispatch(localDetailAction(id));
	}, [id]) 

    return (
        <Fragment>
            <Box p={0} mb={3}>
                <Box mb={2}>
                <Link href="#" onClick={() => { history.goBack() }} color="textPrimary">
                    <KeyboardBackspaceIcon />
                </Link>
                    {/* <IconButton variant="text"  onClick={() => { history.goBack() }}>
                        <KeyboardBackspaceIcon />
                    </IconButton> */}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                    Locales
                </Typography>
                <Typography variant="h4" component="h4" gutterBottom>
                    Crear Local
                </Typography>
            </Box>
            <Box boxShadow={3} bgcolor="common.white" borderRadius={'borderRadius'} pt={4} pb={4} pl={6} pr={3}>
                <Grid container>
                    <Grid item={true} xs={4}>
                        <Box border={0} borderColor="grey.500">
                            <label htmlFor="inputImgPhoto" className="label-img-photo">
                                <img src={imgPhoto} alt="" className="img-photo" />
                            </label>
                            <input type="file" id="inputImgPhoto" hidden accept="image/*"/>
                        </Box>
                    
                    </Grid>
                    <Grid container item={true} xs={8}>
                        <form action="" style={{width: '100%'}} autocomplete="off">
                            <Grid container xs={12} spacing={3}>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Nombre del Local</InputLabel>
                                        <OutlinedInput 
                                            id="name"
                                            type='text'
                                            // value=""
                                            labelWidth={135}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Dirección</InputLabel>
                                        <OutlinedInput 
                                            id="adress"
                                            type='text'
                                            // value=""
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Teléfono</InputLabel>
                                        <OutlinedInput 
                                            id="phone"
                                            type='text'
                                            // value=""
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Horario de atención</InputLabel>
                                            <OutlinedInput 
                                                id="schedule_start"
                                                type='text'
                                                // value=""
                                                labelWidth={145}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Encargado</InputLabel>
                                            <OutlinedInput 
                                                id="manager_name"
                                                type='text'
                                                // value=""
                                                labelWidth={80}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Latitud</InputLabel>
                                            <OutlinedInput 
                                                id="latitude"
                                                type='text'
                                                // value=""
                                                labelWidth={70}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Longitud</InputLabel>
                                            <OutlinedInput 
                                                id="longitude"
                                                type='text'
                                                // value=""
                                                labelWidth={70}
                                            />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <Box justifyContent="flex-end" textAlign='right' mt={2}>
                <Button variant="contained" color="secondary">
                    Agregar Local
                </Button>
            </Box>

        </Fragment>

    )
}

export default LocalDetail
