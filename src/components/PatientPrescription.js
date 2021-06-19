import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Divider,Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { setCurrent, savePres, clearCurrent, getPrescription } from '../actions/prescription';
import {connect} from 'react-redux';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: "auto",
      marginTop:"20",
      width: "90%",
      height: "80%",
    },
  },
  root1: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    backgroundColor: "white",
    width:20,
    height:20
  },
}));
const theme = createMuiTheme({
    typography: {
    fontFamily: [
        'Big Shoulders Stencil Display',
        'cursive',
    ].join(','),
},});

const PrescriptionPad = ({setCurrent, savePres, current, history, clearCurrent,getPrescription, prescription}) => {
  const classes = useStyles();
  const [pname, setPname] = useState('');
  const [age_sex, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [medicines, setMedicines] = useState('');
  const [co,setCo]=useState('');
  const [inv,setInv] = useState('');
  const [f,setF] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('curr')){
      setCurrent({uid: localStorage.getItem('curr')});
      getPrescription(localStorage.getItem('app'));
    }
  },[]);

  const onSubmit = (e) =>{
    e.preventDefault();
    const data = {
      pname,age_sex,date,medicines,co,inv, patUid:current, appoiId:localStorage.getItem('app')
    }
    savePres({data});
    setF(true);
    console.log(history);
  }

  const handleClick = (e) => {
      e.preventDefault();
      clearCurrent();
      window.location.pathname='/home';
  }

  return (
      <Fragment>
    {prescription && <Fragment>
        <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Paper variant="outlined" style={{borderColor:"black"}}>
        <Typography variant="h4" component="h2" align="center" style={{marginTop:10}}>
            Pedia Care Clinic
        </Typography>
        <Typography variant="h6" component="h2" align="center" style={{marginTop:10, fontFamily:"Pangolin"}}>
            Dr. Payal Laddha
        </Typography>
        <Typography variant="h6" component="h2" align="center" style={{fontFamily:"Pangolin"}}>
            (MBBS, DCH, DNB)
        </Typography>
        <Typography variant="h6" component="h2" align="center" style={{marginTop:5,fontFamily:"Pangolin"}}>
            <b>Consulted Pediatrician</b>
        </Typography>
        <Divider style={{width:"100%", height:"3" ,backgroundColor:"black"}}/>
        <Grid container>
            <Grid item xs={5}>
            <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:5,fontFamily:"Pangolin"}}>
                <b>Name: </b>{prescription.pname}
            </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={4}>
                <Typography variant="h6"  component="h6" align="right" style={{marginTop:5, marginRight:10,fontFamily:"Pangolin"}}>
                    <b>Date: </b>{prescription.date}
                </Typography>
            </Grid>
        </Grid>
        <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:5,fontFamily:"Pangolin"}}>
                <b>Age/ Sex: </b>{prescription.age_sex}
        </Typography>
        <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:5,fontFamily:"Abel", height:100}}>
                <b>C/O</b>
                <p>{prescription.co}</p>
        </Typography>
        <Grid container style={{marginBottom:40}}>
            <Grid item xs={6}>
            <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:20,fontFamily:"Abel", height:100}}>
                    <b>INV</b>
                    <p>{prescription.inv}</p>
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <div className={classes.root1}>
                <Avatar variant="square" className={classes.square} src="/img/rx.jpg" style={{marginTop:20}}>
                </Avatar>   
            </div>
            <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:20,fontFamily:"Abel", height:200}}>
                    <p>{prescription.medicines}</p>
            </Typography>
            </Grid>
        </Grid>
        
        <Grid container>
            <Grid item xs={8}>

            </Grid>
            <Grid item xs={4}>
            <Typography variant="h6" component="h2" align="center" style={{marginTop:10, fontFamily:"Pangolin"}}>
                Dr. Payal Laddha
            </Typography>
            <Typography variant="h6" component="h2" align="center" style={{fontFamily:"Pangolin"}}>
                (MBBS, DCH, DNB)
            </Typography>
            <Typography variant="h6" component="h2" align="center" style={{marginTop:0,fontFamily:"Pangolin"}}>
                <b>Consulted Pediatrician</b>
            </Typography>
            <Typography variant="body1" component="h2" align="center" style={{marginTop:0,fontFamily:"Pangolin"}}>
                Reg no. 2015/05/2626
            </Typography>
            </Grid>
        </Grid>
        <Divider style={{width:"100%", height:"3" ,backgroundColor:"black"}}/>
      </Paper>
      
    </div>
    </ThemeProvider>
    <Grid container>
        <Button variant="contained" color="primary" style={{marginLeft:"auto", marginRight:"auto", fontFamily:"Pangolin", fontSize:"15", marginBottom:20, marginTop:10}} onClick={handleClick}>Return to home</Button>
    </Grid></Fragment>}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
    uid : state.auth.uid,
    appointments: state.appoi.appointments,
    current: state.presc.current,
    prescription: state.presc.prescription
  });
  
const mapDispatchToProps = (dispatch) => ({
    setCurrent: ({uid}) => dispatch(setCurrent({uid})),
    savePres: ({data}) => dispatch(savePres({data})),
    clearCurrent:()=> dispatch(clearCurrent()),
    getPrescription:(data) => dispatch(getPrescription(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionPad);