import React, { useState } from "react";
import "../../Dashboard/dashboard.css";
import { medplum } from "@/libs/medplumClient";
import "./patientform.css";
import { Patient } from "@/libs/types";

interface PatientFormProps {
  onCreatePatient: (patient: Patient) => void;
}

const PatientForm = ({ onCreatePatient }: PatientFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFormActive, setIsFormActive] = useState(true);

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const patientResource = {
        resourceType: "Patient",
        name: [
          {
            given: [firstName],
            family: lastName,
          },
        ],
        identifier: [
          {
            system: "Archivos",
            value: `${firstName}-${lastName}`,
          },
        ],
      };

      const patient = await medplum.createResource(patientResource);
      onCreatePatient(patient);
      setFirstName("");
      setLastName("");
      setIsFormActive(false);
    } catch (err) {
      console.error("Error creating patient: ", err);
    }
  };

  const handleAddNewPatient = () => {
    setIsFormActive(true);
  };

  return (
    <div className="box patientForm">
      <div className={`formContainer ${isFormActive ? "" : "inactive"}`}>
        <form onSubmit={handleCreatePatient}>
          <label htmlFor="patientForm" className="patientLabel">
            Empezar: Ingrese nombre del paciente
          </label>
          <input
            type="text"
            placeholder="Primer Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">Crear Paciente</button>
        </form>
      </div>
      {!isFormActive && (
        <button onClick={handleAddNewPatient} className="addNewPatientButton">
          Agregar Nuevo Paciente +
        </button>
      )}
    </div>
  );
};

export default PatientForm;
