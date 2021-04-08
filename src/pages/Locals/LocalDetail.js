import  React, { Fragment, useState, useEffect, useRef, useReducer  } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';
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

import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useParams } from "react-router";



import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import imgPhoto from '../../assets/images/icon-add-photo.svg';
import { localDetailAction } from '../../redux/actions/locals/localsAction';

const LocalDetail = ( props ) => {
    const history = useHistory();
    const dispatchRedux = useDispatch();
    const { id } = useParams();
    const { pathname, state } = useLocation();
    const myForm = useRef(null)  // Hacer referencia al formulario

    const dataLocal = useSelector((state)=> state.locals.local);

    // Llenar campos con useState
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [scheduleStart, setScheduleStart] = useState("");
    const [scheduleEnd, setScheduleEnd] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [managerName, setManagerName] = useState("");

    // 1. useRecuder: Estado inicial para el useReducer
    const initialFormState = {
        name: "",
        address: "",
        phone: "",
        schedule_start: "",
        schedule_end: "",
        latitude: "",
        longitude: "",
        manager_name: "",
    }

    // 2. useRecuder: Reducer manager types
    const formReducer = (state, action) => {
        switch (action.type) {
            case "GET_FORM_LOCAL":
                return {
                    ...state,
                    ...action.payload
                }
            case "UPDATE_FORM_LOCAL":
                return {
                    ...state,
                    [action.input]: action.payload
                }
            case "RESET_FORM_LOCAL":
                return initialFormState
            default:
                break;
        }
    }
    // 3. useRecuder:  Pasamos state y un dispatch -- reducer y estado inicial
    const [stateLocal, dispatch] = useReducer(formReducer, initialFormState);

    // 4. useRecuder: Modificar value en inputs y enviar al "formReducer" 
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "UPDATE_FORM_LOCAL", input: name, payload: value });
    };


    useEffect(() => {
		dispatchRedux(localDetailAction(id));  // Enviar parametro ID para get api
	}, [id])

   
    useEffect(() => {
        dispatch({type: "GET_FORM_LOCAL", payload: dataLocal })  // Enviar datos del api get al "formReducer"
	}, [dataLocal])

    // Al "Desmontar" componente 
    useEffect(() => { 
        dispatch({type: "RESET_FORM_LOCAL"})
    }, [])


    const handleFormReset = () => {
        myForm.current.reset(); // Resetear formulario con useRef (no usado por ahora)
        dispatch({type: "RESET_FORM_LOCAL"})
    }


    const handleFormSubmit = () => {
        console.log("stateLocal", stateLocal)
        handleFormReset();
    }

    return (
        <Fragment>
            <Box p={0} mb={3}>
                <Box mb={2}>
                <button onClick={() => { handleFormReset(); history.goBack() }} color="textPrimary">
                    <KeyboardBackspaceIcon />
                </button>
                <br/>
                <Link to={'/admin/locals'}>
                    <KeyboardBackspaceIcon />
                </Link>
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                    Locales
                </Typography>
                <Typography variant="h4" component="h4" gutterBottom>
                    Detalle Local
                </Typography>
                    <small> {JSON.stringify(stateLocal)}</small>
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
                        <form ref={myForm} style={{width: '100%'}} autocomplete="off">
                            <Grid container xs={12} spacing={3}>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Nombre del Local</InputLabel>
                                        <OutlinedInput 
                                            id="name"
                                            name="name"
                                            type='text'
                                            value={stateLocal.name}
                                            labelWidth={135}
                                            onChange={(e)=> handleChange(e)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Dirección</InputLabel>
                                        <OutlinedInput 
                                            id="address"
                                            name="address"
                                            type='text'
                                            value={stateLocal.address}
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Teléfono</InputLabel>
                                        <OutlinedInput 
                                            id="phone"
                                            name="phone"
                                            type='text'
                                            value={stateLocal.phone}
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Horario de atención</InputLabel>
                                            <OutlinedInput 
                                                id="schedule_start"
                                                name="schedule_start"
                                                type='text'
                                                value={ stateLocal.schedule_start && `${stateLocal.schedule_start}  ${stateLocal.schedule_end}`}
                                                labelWidth={145}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Encargado</InputLabel>
                                            <OutlinedInput 
                                                id="manager_name"
                                                name="manager_name"
                                                type='text'
                                                value={stateLocal.manager_name}
                                                labelWidth={80}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Latitud</InputLabel>
                                            <OutlinedInput 
                                                id="latitude"
                                                name="latitude"
                                                type='text'
                                                value={stateLocal.latitude}
                                                labelWidth={70}
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="outlined-adornment-email">Longitud</InputLabel>
                                            <OutlinedInput 
                                                id="longitude"
                                                name="longitude"
                                                type='text'
                                                value={stateLocal.longitude}
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
                <Button variant="contained" color="secondary" onClick={handleFormSubmit}>
                    Agregar Local
                </Button>
            </Box>

        </Fragment>

    )
}

export default LocalDetail
