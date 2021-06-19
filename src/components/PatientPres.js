import React from "react";
import ReactToPrint from "react-to-print";
import PatientPrescription from "./PatientPrescription";
import PrescPage from "./PrescPage";
import PrescriptionPad from "./PrescriptionPad";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <center>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        </center>
        <div ref={el => (this.componentRef = el)}>
        <PatientPrescription  />
        </div>
        
      </div>
    );
  }
}

export default Example;