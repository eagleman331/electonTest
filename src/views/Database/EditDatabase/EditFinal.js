import React, { useContext, useEffect, useState } from 'react'
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

const EditFinal = () => {
  const [noPict, setNoPict] = useState(false)
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, primaryData, second, final, targetdata } = completeWork
  const [fileData, setFileData] = useState({})
  const [finalData, setFinalData] = useState([])
  const [alias, setAlias] = useState('')
  const imageNum = uuid()
  const myUuid = uuid()

  //
  const [barangay, setBarangay] = useState('')
  const [contactNum, setContactNum] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [district, setDistrict] = useState('')
  const [position, setPosition] = useState('')
  const [unit, setUnit] = useState('')
  const [ao, setAo] = useState('')
  const [description, setDescription] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageDocs, setImageDocs] = useState({})

  const history = useHistory()
  const toggleImage = () => setNoPict((value) => !value)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const handleChangeAlias = (event) => {
    setAlias(event.target.value)
  }
  const handleChangeContact = (event) => {
    setContactNum(event.target.value)
  }
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value)
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

  const updatePhoto = () => {}

  const updateNOPicture = async () => {
    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .collection(second)
      .doc(final)
      .collection(final)
      .doc(targetdata)
      .update({
        alias: alias,
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

  const deletePicture = () => {
    console.log('image', imageDocs)
    const storageRef = storage.refFromURL(imageDocs)
    storageRef
      .delete()
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }

  const updatePicture = async () => {
    const imageId = imageDocs
    if (imageId !== null) {
      deletePicture()
    }
    const uniqueId = myUuid

    const storageRef = storage.ref()
    const fileRef = storageRef.child(uniqueId)

    await fileRef.put(fileData)
    const imagepic = await fileRef.getDownloadURL()
    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .collection(second)
      .doc(final)
      .collection(final)
      .doc(targetdata)
      .set({
        imageName: uniqueId,
        image: imagepic,
        alias: alias,
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

  const deleteData = (first) => {
    db.collection(primaryData).doc('first').delete()
  }
  useEffect(() => {
    var docRef = db.collection(primaryData).doc(first).collection(first).doc(second)
    .collection(second)
    .doc(final)
    .collection(final)
    .doc(targetdata)
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setFinalData(doc.data())
      } else {
        console.log('no document Exest')
      }
    })
  }, [])

  useEffect(() => {
    setImageName(finalData.imageName)
    setImageDocs(finalData.image)
    setAlias(finalData.alias)
    setFirstName(finalData.firstName)
    setLastName(finalData.lastName)
    setContactNum(finalData.contact)
    setMunicipality(finalData.municipality)
    setDistrict(finalData.district)
    setBarangay(finalData.barangay)
    setPosition(finalData.position)
    setUnit(finalData.unit)
    setAo(finalData.areaOperation)
    setDescription(finalData.description)
  }, [finalData])
  console.log('image', imageName)
  console.log('first', first)
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
                  <CFormInput id="alias" value={alias} onChange={handleChangeAlias} />
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
                  <CFormLabel>Contact</CFormLabel>
                  <CFormInput
                    htmlFor="contactNum"
                    id="contactNum"
                    value={contactNum}
                    onChange={handleChangeContact}
                  />
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
                  <CButton disabled={!noPict} onClick={updatePicture}>
                    Update Picture
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton disabled={noPict} onClick={updateNOPicture}>
                    No Picture
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

export default EditFinal
