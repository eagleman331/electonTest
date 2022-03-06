import React, { useContext, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { db, storage } from './../../../Firebase'
import { TaskContext } from './../../../contexts/TaskContext'

const AddFinal = () => {
  const [noPict, setNoPict] = useState(false)
  const [image, setImage] = useState(null)
  const [name, setName] = useState(null)
  const [fileImage, setFileImage] = useState('FileName')
  const history = useHistory()
  const [fileUrl, setFileUrl] = useState(null)
  const [fileData, setFileData] = useState({})
  //
  const [barangay, setBarangay] = useState(null)
  const [contactNum, setContactNum] = useState(null)
  const [firstName, setFirstname] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [municipality, setMunicipality] = useState(null)
  const [district, setDistrict] = useState(null)
  const [position, setPosition] = useState(null)
  const [unit, setUnit] = useState(null)
  const [ao, setAo] = useState(null)
  const [description, setDescription] = useState(null)
  const myUuid = uuid()
  const imageNum = uuid()
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData,final } = completeWork

  const toggleImage = () => setNoPict((value) => !value)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const uploadImage = async () => {
    const response = await fetch(file.uri)
    const blob = await response.blob()
    var ref = firebase.storage().ref().child('FolderName')
    return ref.put(blob)
  }

  const register = async () => {
    const uniqueId = myUuid
    const imageName = imageNum
    const storageRef = storage.ref()
    const fileRef = storageRef.child(imageName)
    await fileRef.put(fileData)
    const imageDocs = await fileRef.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .collection(second)
      .doc(final)
      .collection(final)
      .doc(uniqueId)
      .set({
        imageName: imageName,
        image: imageDocs,
        alias: name,
        firstName: firstName,
        lastName: lastName,
        contact: contactNum,
        municipality: municipality,
        district: district,
        barangay: barangay,
        position: position,
        unit: unit,
        areaOperation: ao,
        description: description,
      })
      .catch((error) => alert(error))

    history.push('/finalCategory')
  }
  const registerNoimage = async () => {
    const uniqueId = myUuid
    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .collection(second)
      .doc(final)
      .collection(final)
      .doc(uniqueId)
      .set({
        imageName: null,
        image: null,
        alias: name,
        firstName: firstName,
        lastName: lastName,
        contact: contactNum,
        municipality: municipality,
        district: district,
        barangay: barangay,
        position: position,
        unit: unit,
        areaOperation: ao,
        description: description,
      })
      .catch((error) => alert(error))

    history.push('/finalCategory')
  }
  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeContact = (event) => {
    setContactNum(event.target.value)
  }
  const handleChangeFirstName = (event) => {
    setFirstname(event.target.value)
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleChangeBarangay = (event) => {
    setBarangay(event.target.value)
  }
  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value)
  }
  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value)
  }
  const handleChangePosition = (event) => {
    setPosition(event.target.value)
  }
  const handleChangeUnit = (event) => {
    setUnit(event.target.value)
  }
  const handleChangeAo = (event) => {
    setAo(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Gutters</small>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Choose a Picture in your File</CFormLabel>
              <CFormInput
                labelText="Company (disabled)"
                id="formFile"
                type="file"
                onChange={onFileChange}
              />
            </div>

            <br />
            <p className="text-medium-emphasis small">
              By adding <a href="https://coreui.io/docs/layout/gutters/">gutter modifier classes</a>
              , you can have control over the gutter width in as well the inline as block direction.
            </p>

            <p className="text-medium-emphasis small">
              More complex layouts can also be created with the grid system.
            </p>
            <DocsExample href="forms/layout#gutters">
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Name</CFormLabel>
                  <CFormInput
                    labelText="First Name"
                    id="first-name"
                    value={firstName}
                    onChange={handleChangeFirstName}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Surname</CFormLabel>
                  <CFormInput id="inputCity" value={lastName} onChange={handleChangeLastName} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Alias</CFormLabel>
                  <CFormInput id="name" value={name} onChange={handleChangeName} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Position</CFormLabel>
                  <CFormInput id="position" value={position} onChange={handleChangePosition} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Area of Responsibility</CFormLabel>
                  <CFormInput id="ao" value={ao} onChange={handleChangeAo} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Unit</CFormLabel>
                  <CFormInput id="unit" value={unit} onChange={handleChangeUnit} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Contact</CFormLabel>
                  <CFormInput id="inputCity" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Surname</CFormLabel>
                  <CFormInput id="inputCity" />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Loc Barangay</CFormLabel>
                  <CFormInput id="barangay" value={barangay} onChange={handleChangeBarangay} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Loc City/Municipality</CFormLabel>
                  <CFormInput
                    labelText="Municipality/City"
                    id="municipality"
                    value={municipality}
                    onChange={handleChangeMunicipality}
                  />
                </CCol>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Descirption</CFormLabel>
                  <CFormTextarea
                    id="description"
                    fullWidth={true}
                    value={description}
                    onChange={handleChangeDescription}
                  ></CFormTextarea>
                </div>

                <CCol xs={6}>
                  <CButton disabled={!noPict} onClick={register}>
                    Add With Picture
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton disabled={noPict} onClick={registerNoimage}>
                    Add No Picture
                  </CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddFinal

