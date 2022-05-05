import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAppointments,deleteAppointment } from '../actions/appointment';
import { connect } from 'react-redux'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize:14
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, confirm, alloDate, alloTime, meetingLink) {
  return { name, confirm, alloDate, alloTime, meetingLink };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomizedTables = ({getAppointments, uid, appointments,deleteAppointment}) => {
  const classes = useStyles();
    useEffect(() => {
        getAppointments(uid);
    },[]);

    const handleClick = ({row}) => {
      console.log(row);
      localStorage.setItem('curr',row.patUid);
      localStorage.setItem('app',row.id);
    }

    const handleDelete = ({row}) => {
      console.log(row);
      deleteAppointment(row.id);
      setTimeout(() => {
        window.location.reload();
        // window.location.pathname='/appointments';
      },1000);
    }

  return (
    <TableContainer component={Paper} style={{marginTop:100, width:"80%",marginLeft:"auto", marginRight:"auto"}}>
      {appointments && appointments.length==0 && <h4>No appointments</h4>}
      {appointments && appointments.length>0 && <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient Name</StyledTableCell>
            <StyledTableCell align="center">Confirmation</StyledTableCell>
            <StyledTableCell align="center">Allocated Date</StyledTableCell>
            <StyledTableCell align="center">Allocated Time</StyledTableCell>
            <StyledTableCell align="center">Whatsapp Number</StyledTableCell>
            <StyledTableCell align="center">Prescription</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments && appointments.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{'Confirmed'}</StyledTableCell>
              <StyledTableCell align="center">{row.appDate===''?'-':row.appDate}</StyledTableCell>
              <StyledTableCell align="center">{row.appTime===''?'-':row.appTime}</StyledTableCell>
              <StyledTableCell align="center">{row.phone===''?'-':row.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.prescription===''?'-':<a href='/patient/prescription' onClick={e => {
                handleClick({row})
              }}>View Prescription</a>}</StyledTableCell>
              <StyledTableCell align="center">{row.prescription!==''?'-':<a href='#' onClick={e => {
                handleDelete({row});

              }}>Delete Appointment</a>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>}
    </TableContainer>
  );
}
const mapStateToProps = (state) => ({
    uid : state.auth.uid,
    appointments: state.appoi.patientAppointments
});

const mapDispatchToProps = (dispatch) => ({
    getAppointments: (uid) => dispatch(getAppointments(uid)),
    deleteAppointment: (id) => dispatch(deleteAppointment(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomizedTables);
// export default CustomizedTables;