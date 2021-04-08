
/* eslint-disable default-case */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction } from '../../../redux/actions/auths/register/registerAction';


const useStyles = makeStyles((theme) => ({
	marginBottom: {
		marginBottom: theme.spacing(2),
	  },
  }));

const Register = () => {
	const classes = useStyles();  // Estilos peronalizado contenedor
	const history = useHistory();
	const dispatch = useDispatch();

	const { error } = useSelector((state) => state.auth);

	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorPassword, setErrorPassword] = useState(false);

	const [valueUser, setValueUser] = useState({
		email: '',
		password: ''
	});

	const handleChange = (event) => {
		// Metodo 1 crear objetos con el valor de nombre y el valor
		const { value, name } = event.target;
		setValueUser({ ...valueUser, [name]: value });
	};

	const handleSignUpClick = (event) => {
		event.preventDefault();
		console.log("signUpAction")
		if (valueUser.password !== confirmPassword) {
			setErrorPassword(true)
			return
		}
		dispatch(signUpAction(valueUser, history));
	};


	// useEffect(() => {
	// 	console.log("isAuthenticated", currentUser)
	// }, [currentUser])

	return (		 
			
			 <Box 
			 	// bgcolor="secondary.main"
			 	boxShadow={3}
				bgcolor="background.paper"
				m={1}
				p={4}
				borderRadius={'borderRadius'}
				style={{ maxWidth: 300, width: '100%', height: 'auto' }}>
			 	<form  noValidate autoComplete="off">
					<Box>
						<Box mb={3}>
							<Typography  color="textSecondary"  variant="h4" component="h4">
								¡Registrate!
							</Typography>
							<Typography  color="textSecondary" variant="body2" component="p">
								Crea tu cuenta
							</Typography>
						</Box>

						
						<FormControl variant="outlined" fullWidth={true} className={classes.marginBottom}>
							<InputLabel htmlFor="inputEmail">Email</InputLabel>
							<OutlinedInput 
								id="inputEmail"
								name="email"
								type='text'
								value={valueUser.email}
								onChange={handleChange}
								endAdornment={
								<InputAdornment position="end">
									<IconButton edge="end" tabIndex="-1" disabled>
										<PersonIcon/>
									</IconButton>
								</InputAdornment>
								}
								labelWidth={50}
							/>
							{/* <FormHelperText id="filled-weight-helper-text">*Campo obligatorio</FormHelperText> */}
						</FormControl>

						<FormControl variant="outlined" fullWidth={true}  className={classes.marginBottom}>
							<InputLabel htmlFor="inputPassword">Password</InputLabel>
							<OutlinedInput 
								id="inputPassword"
								name='password'
								type='password'
								value={valueUser.password}
								onChange={handleChange}
								endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										tabIndex="-1"
                                        disabled
									>
                                        <LockIcon/>
									</IconButton>
								</InputAdornment>
								}
								labelWidth={80}
							/>
							{/* <FormHelperText id="filled-weight-helper-text">*Campo obligatorio</FormHelperText> */}
						</FormControl>

                        <FormControl variant="outlined" fullWidth={true}  className={classes.marginBottom}>
							<InputLabel htmlFor="inputPassword">Repetir Password</InputLabel>
							<OutlinedInput 
								id="confirm_password"
								name='confirm_password'
								type='password'
								value={confirmPassword}
								onChange={(e)=>setConfirmPassword(e.target.value)}
								endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										tabIndex="-1"
                                        disabled
									>
                                        <EnhancedEncryptionIcon/>
									</IconButton>
								</InputAdornment>
								}
								labelWidth={140}
							/>
							{ errorPassword && <FormHelperText error id="component-error-text">*La contraseña no coincide</FormHelperText> }
						</FormControl>

					</Box>
					<Box justifyContent="center" textAlign='center' mb={2}  >
							
							{/* <Link href="/recover-password" color="inherit">
								¿Olvidaste tu contraseña?
							</Link> */}
							<Link to="/" style={{textDecoration: "none"}}>
								<Typography color="textSecondary">
									Ingresar con mi cuenta
								</Typography>
							</Link>
						
					</Box>

					<Box justifyContent="center" textAlign='center'>
						{/* <Button variant="contained" color="secondary" fullWidth={true} onClick={()=>history.push("/admin")}> */}
							<Button variant="contained" color="secondary" fullWidth={true} onClick={handleSignUpClick}>
								Registrarse
							</Button>
					</Box>
				</form>
			 </Box>

	)
}

export default Register