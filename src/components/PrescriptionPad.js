import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Divider,Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { setCurrent, savePres, clearCurrent } from '../actions/prescription';
import {connect} from 'react-redux';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: "auto",
      marginTop:"20",
      width: "70%",
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
    width:"5%",
    height:"10%"
  },
}));
const theme = createMuiTheme({
    typography: {
    fontFamily: [
        'Big Shoulders Stencil Display',
        'cursive',
    ].join(','),
},});

const PrescriptionPad = ({setCurrent, savePres, current, history, clearCurrent}) => {
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
      window.location.pathname='/admin';
  }

  return (
      <Fragment>
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
                <b>Name: </b><input type="text" name="pname" value={pname} onChange={e => {e.preventDefault();setPname(e.target.value)}} style={{border:"none"}} />
            </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={4}>
                <Typography variant="h6"  component="h6" align="right" style={{marginTop:5, marginRight:10,fontFamily:"Pangolin"}}>
                    <b>Date: </b><input name="date" type="text" value={date} onChange={e => {e.preventDefault();setDate(e.target.value)}}  style={{border:"none"}} />
                </Typography>
            </Grid>
        </Grid>
        <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:5,fontFamily:"Pangolin"}}>
                <b>Age/ Sex: </b><input name="age" type="text" value={age_sex} onChange={e => {e.preventDefault();setAge(e.target.value)}} style={{border:"none"}} />
        </Typography>
        <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:5,fontFamily:"Abel"}}>
                <b>C/O</b>
        </Typography>
        <textarea name="co" value={co} onChange={e => {e.preventDefault();setCo(e.target.value)}} style={{height:"100", marginLeft:10, width:"80%",border:"none",fontFamily:"Abel"}}></textarea>
        <Grid container style={{marginBottom:40}}>
            <Grid item xs={6}>
            <Typography variant="h6" component="h6" align="left" style={{marginLeft:10,marginTop:20,fontFamily:"Abel"}}>
                    <b>INV</b>
            </Typography>
            <textarea name="inv" value={inv} onChange={e => {e.preventDefault();setInv(e.target.value)}}  style={{height:"200", marginLeft:10, width:"80%",border:"none",fontFamily:"Abel"}}></textarea>
            </Grid>
            <Grid item xs={6}>
            <div className={classes.root1}>
                <Avatar variant="square" className={classes.square} src="/img/rx.jpg" style={{marginTop:20}}>
                </Avatar>   
            </div>
            <textarea name="medicines" value={medicines} onChange={e => {e.preventDefault();setMedicines(e.target.value)}} style={{height:"200", marginLeft:10, width:"80%",border:"none",fontFamily:"Abel"}}></textarea>
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
        {!f&&<Button variant="contained" color="primary" style={{marginLeft:"auto", marginRight:"auto", fontFamily:"Pangolin", fontSize:"15", marginBottom:20, marginTop:10}} onClick={onSubmit}>Save Prescription</Button>}
        <Button variant="contained" color="primary" style={{marginLeft:"auto", marginRight:"auto", fontFamily:"Pangolin", fontSize:"15", marginBottom:20, marginTop:10}} onClick={handleClick}>Return to home</Button>
    </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
    uid : state.auth.uid,
    appointments: state.appoi.appointments,
    current: state.presc.current
  });
  
const mapDispatchToProps = (dispatch) => ({
    setCurrent: ({uid}) => dispatch(setCurrent({uid})),
    savePres: ({data}) => dispatch(savePres({data})),
    clearCurrent:()=> dispatch(clearCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionPad);