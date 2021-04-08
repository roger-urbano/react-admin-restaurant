import { Box, Typography, Grid,  FormControl, InputLabel, InputAdornment, Input, FilledInput, OutlinedInput, IconButton, Button, ListItemIcon } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import SmileIcon from "@material-ui/icons/Mood";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';

import { useHistory, Switch, Route  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { localListAction } from '../../redux/actions/locals/localsAction';
import LoaderDefault from '../../components/loaderDefault';
import LocalDetail from './LocalDetail';

/* Table Custom  */
const StyledTableCell = withStyles((theme) => ({
	head: {
		// backgroundColor: theme.palette.common.white,
		backgroundColor: theme.palette.grey[800],
		// color: theme.palette.text.primary,
		color: theme.palette.common.white,
		borderBottom: '0 !important',
		fontWeight: 700,
	},
	body: {
	  fontSize: 14,
	  borderBottom: '0 !important',
	},
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
	root: {
		borderBottom: 0,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[1],

	  '&:nth-of-type(odd)': {
		// backgroundColor: theme.palette.action.hover,
		backgroundColor: theme.palette.background.paper,
	  },
	  '&:nth-of-type(even)': {
		// backgroundColor: theme.palette.action.hover,
		backgroundColor: theme.palette.background.paper,
	  },
	  '& th:first-child,td:first-child':  { 
		borderBottomLeftRadius: 4,
		borderTopLeftRadius: theme.shape.borderRadius
	   },
	  '& th:last-child,td:last-child':  { 
		borderBottomRightRadius: 4,
		borderTopRightRadius: theme.shape.borderRadius
	   }
	},
  }))(TableRow);


  /* Styles classes custom */ 
  const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
		borderCollapse: 'separate',
  		borderSpacing: '0 10px'
	},
	bgInput: {
		backgroundColor: theme.palette.background.paper
	},
	textWhite: {
		color: theme.palette.background.paper
	},
	iconButton: {
		borderRadius: '50% !important',
		// backgroundColor:  theme.palette.text.disabled,
		// color: theme.palette.common.white,
		padding: theme.spacing(1),
		transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		'&:hover': {
			backgroundColor:  theme.palette.grey[300],
		},
		'&.active': {
			color: theme.palette.common.white,
			backgroundColor:  theme.palette.grey[800],
		}
	},
	popper: {
		zIndex: 1,
		top: '10px !important',
		// backgroundColor: `${theme.palette.action.focus} !important`,
		'&[x-placement*="bottom-end"] .arrow': {
		  top: 0,
		 // left: 0,
		  right: '1em',
		  marginTop: '-0.9em',
		  width: '3em',
		  height: '1em',
		  '&::before': {
			borderWidth: '0 1em 1em 1em',
			borderColor: `transparent transparent ${theme.palette.grey[800]} transparent`,
		  },
		},
		'&[x-placement*="top"] .arrow': {
		  bottom: 0,
		  left: 0,
		  marginBottom: '-0.9em',
		  width: '3em',
		  height: '1em',
		  '&::before': {
			borderWidth: '1em 1em 0 1em',
			borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
		  },
		},
		'&[x-placement*="right"] .arrow': {
		  left: 0,
		  marginLeft: '-0.9em',
		  height: '3em',
		  width: '1em',
		  '&::before': {
			borderWidth: '1em 1em 1em 0',
			borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
		  },
		},
		'&[x-placement*="left"] .arrow': {
		  right: 0,
		  marginRight: '-0.9em',
		  height: '3em',
		  width: '1em',
		  '&::before': {
			borderWidth: '1em 0 1em 1em',
			borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
		  },
		},
	  },
	arrow: {
		position: 'absolute',
		fontSize: 7,
		width: '3em',
		height: '3em',
		'&::before': {
		  content: '""',
		  margin: 'auto',
		  display: 'block',
		  width: 0,
		  height: 0,
		  borderStyle: 'solid',
		},
	  },
	  menuList: {
		  backgroundColor: theme.palette.grey[800],
		  display: 'flex',
		  justifyContent: 'space-between',
		  alignItems: 'center',
		  padding: 0,
		  borderRadius: theme.shape.borderRadius
	  },
	  menuItem: {
		  fontSize: '14px',
		  color: theme.palette.common.white,
	  },
	  listItemIcon: {
		  minWidth: 'inherit',
		  color: theme.palette.common.white,
		  padding: '8px 8px 8px 0px',
	  }

  }));

  /* Custom Input(component Input) */
  const StyledOutlinedInput = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
  }))(OutlinedInput);


const Locals = () => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();


	const { listLocals } = useSelector((state)=> state.locals)
	const { loader } = useSelector((state)=> state.locals);
	const dataLocals = useSelector((state)=> state.locals.listLocals)
	const [params, setParams] = useState({
		_page: 1,
		_limit: 3
	  });
	
	useEffect(() => {
		setParams( { ...params, _page:1, _limit: 3})
		dispatch(localListAction(params)) 
	}, []) 

    const handleAdd = () => {
        history.push("/admin/locals/create");
    } 

	/* State popup Multi */
	const [open, setOpen] = React.useState(false);
	const [poperIndex, setPoperIndex] = React.useState(-1);
	const anchorRef = React.useRef([]);
	/* Arrow popup Multi*/
	const arrowRef = React.useRef([]);
	const [arrow, setArrow] = React.useState(false);
	const [ idCurrent, setIdCurrent ] = useState()

	/* Manager Poper open/close. */
	const handleToggle = (index) => {
		setOpen((prevOpen) => !prevOpen);
		setPoperIndex(index);
		setArrow(true)
	  };
	  
	  // Cerrar Popup List
	  const handleClose = (index) => (event) => {
		setArrow(false)
		if (anchorRef.current[index] && anchorRef.current[index].contains(event.target)) {
		 	return;
		}
		setOpen(false);
	  };
	
	// Mostrar Poup List
	  function handleListKeyDown(event) {
		if (event.key === 'Tab') {
		  event.preventDefault();
		  setOpen(false);
		}
	  }

	const tableHeadData = [
		'Nombre',
		'Dirección',
		'Teléfono',
		'Horario',
	]

	const tableBodyData = [
		{name: 'La Rosa Nautica', direction: 'Chorrillos 345', phone: '2584480', schedule: '9:00 - 6:00' },
		{name: 'Bembos', direction: 'Cenro de Lima 421', phone: '4568870', schedule: '9:00 - 7:00' },
		{name: 'China Wok', direction: 'San Borja 120', phone: '4569871', schedule: '9:00 - 8:00' },
		{name: 'Popeyes', direction: 'Miraflores 577', phone: '4523698', schedule: '10:00 - 6:00' },
	]

	return (
		<>
			<Box p={0} mb={3}>
				<Typography variant="h4" component="h2" gutterBottom>
					Locales
				</Typography>
				<Typography variant="body1" component="p" gutterBottom>
					Administra y gestiona todos los localesde tu restaurante
				</Typography>
			</Box>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				spacing={0}
			>
				<Grid container item={true} xs={12} sm={6} alignItems="center" direction="row" justify="flex-start">
					<FormControl variant="outlined" style={{minWidth: 320}}>
						<InputLabel  htmlFor="outlined-adornment-amount">Realiza una búsqueda</InputLabel>
						<StyledOutlinedInput
							id="outlined-adornment-amount"
							endAdornment={
								<InputAdornment position="start">
									<SearchIcon color="disabled"/>
								</InputAdornment>}
							labelWidth={180}
						/>
					</FormControl>
					<Box ml={2}>
						<Button variant="contained" color="secondary" disableElevation m={2}> Buscar </Button>
					</Box>
				</Grid>
				<Grid container item={true} xs={12} sm={4} justify="flex-end">
					<Button 
						variant="contained" 
						color="primary" 
						disableElevation 
						startIcon={<AddCircleOutlineIcon />}
						onClick={handleAdd}> Agregar Local </Button>
				</Grid>
			</Grid>

			<TableContainer component={Box} mt={3}>
				<Table className={classes.table} aria-label="customized table" size="small">
					<TableHead>
						<StyledTableRow>
							{
								tableHeadData.map((cell, index) => (
									<StyledTableCell key={index} align="left" style={{padding: '10px 16px'}}>{ cell }</StyledTableCell>
									))
								}
							<StyledTableCell align="left">Acción</StyledTableCell>


						</StyledTableRow>
					</TableHead>
					<TableBody>
						{ !loader ? (
							listLocals?.map((local, index) => (
								<StyledTableRow key={local.id}>
									<StyledTableCell align="left">{local.name}</StyledTableCell>
									<StyledTableCell align="left">{ local.address}</StyledTableCell>
									<StyledTableCell align="left">{ local.phone }</StyledTableCell>
									<StyledTableCell align="left">{local.schedule_start} - {local.schedule_end}</StyledTableCell>
									{ true && (
										<StyledTableCell align="center">
		
											<IconButton
												className={`${classes.iconButton} ${!!(index === poperIndex && open) ? 'active' : null}`}
												ref={(element)=>anchorRef.current[index] = element}
												aria-controls={open ? 'menu-list-grow' : undefined}
												aria-haspopup="true"
												onClick={()=>handleToggle(index)}
											>
												<MoreHorizIcon fontSize="small" />
											</IconButton>
											
											<Popper 
												open={index === poperIndex && open}
												anchorEl={anchorRef.current[index]} 
												role={undefined} 
												transition 
												placement='bottom-end'
												disablePortal={true}
												className={classes.popper}
												modifiers={{
													flip: {
														enabled: false,
													},
													preventOverflow: {
														enabled: false,  // Posición fija
														boundariesElement: 'scrollParent',
													},
													arrow: {
														enabled: true,
														element: arrowRef.current[index],
													},
												}}
												>
												{({ TransitionProps, placement }) => (
													<Grow
														{...TransitionProps}
														style={{ transformOrigin: placement }}
													>
														<Paper>
														{arrow && index === poperIndex ? <span className={`${classes.arrow} arrow`} ref={(element)=>arrowRef.current[index] = element} /> : null}
															<ClickAwayListener onClickAway={handleClose(index)}>
																<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} classes={{root: classes.menuList}}>
																	<MenuItem onClick={handleClose(index)} fontSize={'8px'} classes={{root: classes.menuItem}}>
																		<ListItemIcon classes={{root: classes.listItemIcon}}>
																			<DeleteIcon fontSize="small" color="inherit"/>
																		</ListItemIcon> 
																		Eliminar
																	</MenuItem>
																	<MenuItem onClick={handleClose(index)} classes={{root: classes.menuItem}}>
																		<ListItemIcon classes={{root: classes.listItemIcon}}>
																			<EditIcon fontSize="small" color="inherit"/>
																		</ListItemIcon> 
																		Editar
																	</MenuItem>
																	<MenuItem onClick={()=> {handleClose(index); setIdCurrent(local.id); history.push(`locals/detail/${local.id}`)}}classes={{root: classes.menuItem}}>
																		<ListItemIcon classes={{root: classes.listItemIcon} }>
																			<DescriptionIcon fontSize="small" color="inherit"/>
																		</ListItemIcon> 
																		Detalle
																	</MenuItem>
																</MenuList>
															</ClickAwayListener>
														</Paper>
													</Grow>
												)}
											</Popper>
		
										</StyledTableCell>
										)
									}									
								</StyledTableRow>
							))
							) :
							(
								<TableRow>
									<TableCell colSpan="5">
										<LoaderDefault width="60" height="60" timeout={3000} heightWrap="200px" />
									</TableCell>
								</TableRow>
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
	
} 
export default Locals



/* Custom Box */
	// <Box mt = { 3} className="tableDiv">
	// 	<Box display="flex" className={classes.tableDivHead}
	// 		p={1}
	// 		fullWidth={true}
	// 		boxShadow={1}
	// 		borderRadius={8} mb={1}>
	// 		{
	// 			tableHeadData.map((col) => (
	// 				<Box p={1} flexGrow={1} fontWeight={700} color="primary.contrastText">
	// 					<Typography
	// 						variant="body2"
	// 						component="span"
	// 						gutterBottom
	// 						// color="inherit"
	// 						style={{ fontWeight: 600 }}>
	// 						{col}
	// 					</Typography>
	// 				</Box>
	// 			))
	// 		}
	// 	</Box>

	// 	{
	// 		tableBodyData.map((item) => (
	// 			<Box
	// 				display="flex"
	// 				bgcolor="background.paper"
	// 				className={classes.tableDivRow}
	// 				p={1}
	// 				fullWidth={true}
	// 				boxShadow={1}
	// 				borderRadius={8} mb={1}>
	// 				<Box p={1} flexGrow={1} flexShrink={1}>
	// 					<Typography variant="body2" component="span" gutterBottom>
	// 						{item.name}
	// 					</Typography>
	// 				</Box>
	// 				<Box p={1} flexGrow={1} flexShrink={1}>
	// 					<Typography variant="body2" component="span" gutterBottom>
	// 						{item.direction}
	// 					</Typography>
	// 				</Box>
	// 				<Box p={1} flexGrow={1} flexShrink={1}>
	// 					<Typography variant="body2" component="span" gutterBottom>
	// 						{item.phone}
	// 					</Typography>
	// 				</Box>
	// 				<Box p={1} flexGrow={1} flexShrink={1}>
	// 					<Typography variant="body2" component="span" gutterBottom>
	// 						{item.schedule}
	// 					</Typography>
	// 				</Box>
	// 				<Box p={1} flexGrow={1} flexShrink={1}>
	// 					<Typography variant="body2" component="span" gutterBottom>
	// 						{item.schedule}
	// 					</Typography>
	// 				</Box>
	// 			</Box>
	// 		))
	// 	}
	// </Box>
