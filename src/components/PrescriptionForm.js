import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { setCurrent } from '../actions/prescription';
import {connect} from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" component="h5">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Pedia Care Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  labelRoot: {
    fontSize: 18,
    "&$labelFocused": {
      color: "purple"
    }
  },
  inputRoot: {
    fontSize: 18
  },
}));

const PrescriptionForm = ({setCurrent}) => {
  const classes = useStyles();
  const [pname, setPname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [medicines, setMedicines] = useState('');

  useEffect(() => {
    if(localStorage.getItem('curr')){
      setCurrent({uid: localStorage.getItem('curr')});
    }
  },[]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h2">
          Prescription
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="pname"
                name="pname"
                variant="outlined"
                required
                fullWidth
                id="pname"
                label="Patient Name"
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    }
                  }}
                value={pname}
                onChange={e=>{
                    e.preventDefault();
                    setPname(e.target.value);
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    }
                  }}
                value={age}
                onChange={e=>{
                    e.preventDefault();
                    setAge(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date (dd/mm/yyyy)"
                name="date"
                autoComplete="date"
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                    }
                  }}
                value={date}
                onChange={e=>{
                    e.preventDefault();
                    setDate(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    id="outlined-multiline-static"
                    label="Medicines"
                    style={{width:"100%"}}
                    multiline
                    rows={4}
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                        }
                      }}
                      value={medicines}
                      onChange={e=> {
                        e.preventDefault();
                        setMedicines(e.target.value);
                      }}
                    variant="outlined"
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={e => {
                    e.preventDefault();
                    setGender(e.target.value);
                }}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save and preview prescription
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  uid : state.auth.uid,
  appointments: state.appoi.appointments
});

const mapDispatchToProps = (dispatch) => ({
  setCurrent: ({uid}) => dispatch(setCurrent({uid}))
});

export default connect(mapStateToProps,mapDispatchToProps)(PrescriptionForm);