import React from "react";
import Patient from "../../Patient/Patient";
import ListPendingCoutMedical from "../../../containers/Receptionist/ListPendingCoutMedical/ListPendingCoutMedical";
export default class ReceivePatient extends React.Component {

  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <ListPendingCoutMedical />
          </div>

        </div>
        <Patient />
      </>
    );
  }
}