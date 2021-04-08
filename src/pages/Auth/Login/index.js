/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkMat } from '@material-ui/core/Link';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

import { Container, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../../../redux/actions/auths/login/loginAction';
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
	marginBottom: {
		marginBottom: theme.spacing(2),
	},
}));

const Login = () => {
	const classes = useStyles();  // Estilos peronalizado contenedor
	const history = useHistory();
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { currentUser, error } = useSelector((state) => state.auth);

	const [showPassword, setShowPassword] = useState(false)

	// const [valueUser, setValueUser] = useState({
	// 	email: '',
	// 	password: ''
	// });

	const [valueUser, setValueUser] = useState({});

	const handleChange = (event) => {
		// Metodo 1 crear objetos con el valor de nombre y el valor
		const { id, value, name } = event.target;
		setValueUser({ ...valueUser, [name]: value });

		// Almacenar valor dependiendo el atributo name.
		switch (name) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
	};


	// useEffect(() => {
	// 	console.log("isAuthenticated", currentUser)
	// }, [currentUser])

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSignUpClick = (event) => {
		event.preventDefault();
		dispatch(signInAction({ email, password }, history));
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			console.log(event.key)
			handleSignUpClick(event)
		}
	}

		//   if(currentUser !== null) {
		// 		return <Redirect to="/admin/locals" />
		// 	}

		return (

			<Box
				// bgcolor="secondary.main"
				boxShadow={3}
				bgcolor="background.paper"
				m={1}
				p={4}
				borderRadius={'borderRadius'}
				style={{ maxWidth: 300, width: '100%', height: 'auto' }}>
				<form noValidate autoComplete="off" onKeyDown={handleKeyDown}>
					<Box>
						<Box mb={3}>
							<Typography color="textSecondary" variant="h4" component="h4">
								¡Bienvenido!
							</Typography>
							<Typography color="textSecondary" variant="body2" component="p">
								Ingresa a tu cuenta
							</Typography>
						</Box>


						<FormControl variant="outlined" fullWidth={true} className={classes.marginBottom}>
							<InputLabel htmlFor="inputEmail">Email</InputLabel>
							<OutlinedInput
								id="inputEmail"
								name="email"
								type='text'
								value={email}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton edge="end" tabIndex="-1">
											<PersonIcon />
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
							{/* <FormHelperText id="filled-weight-helper-text">*Campo obligatorio</FormHelperText> */}
						</FormControl>

						<FormControl variant="outlined" fullWidth={true} className={classes.marginBottom}>
							<InputLabel htmlFor="inputPassword">Password</InputLabel>
							<OutlinedInput
								id="inputPassword"
								name='password'
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											tabIndex="-1"
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
							/>
							{/* <FormHelperText id="filled-weight-helper-text">*Campo obligatorio</FormHelperText> */}
						</FormControl>
						{/* 						
						<Box width={1} mb={2}>
							<TextField fullWidth={true} id="outlined-basic" label="Contraseña" variant="outlined" />
						</Box> */}
					</Box>
					<Box justifyContent="center" textAlign='center' mb={2}  >

						{/* <Link href="/recover-password" color="inherit">
								¿Olvidaste tu contraseña?
							</Link> */}
						<Link to="/register" style={{ textDecoration: "none" }}>
							<Typography color="textSecondary">
								Registrarte
							</Typography>
						</Link>

					</Box>

					<Box justifyContent="center" textAlign='center'>
						{/* <Button variant="contained" color="secondary" fullWidth={true} onClick={()=>history.push("/admin")}> */}
						<Button
							variant="contained"
							color="secondary"
							fullWidth={true}
							onClick={handleSignUpClick}>
							Inicia sesión
						</Button>
					</Box>
				</form>
			</Box>

		)
	}

	export default Login