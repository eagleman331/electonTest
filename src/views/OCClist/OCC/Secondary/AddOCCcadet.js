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
import { db, storage } from './../../../../Firebase'
import { TaskContext } from './../../../../contexts/TaskContext'

const AddOCCcadet = () => {
  const [noPict, setNoPict] = useState(false)
  const history = useHistory()
  const [fileData, setFileData] = useState({})

  const [cadetName, setCadetName] = useState(null)
  const [cadetSurName, setCadetSurName] = useState(null)
  const [email, setEmail] = useState(null)
  const [cadetNumber, setCadetNumber] = useState(null)
  const [middleName, setMiddleName] = useState(null)

  const [ocNumber, setOcNumber] = useState(null)
  const [course, setCourse] = useState(null)
  const [gender, setGender] = useState(null)
  const [ethnic, setEthnic] = useState(null)

  const [finalData, setFinalData] = useState([])

  //

  const myUuid = uuid()
  const imageNum = uuid()
  const cadetTemId = uuid()

  const idAllCadet = uuid()

  const { completeWork, setCompleteWOrk, className } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork

  const toggleImage = () => setNoPict((value) => !value)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const register = async () => {
    const uniqueId = myUuid
    const imageName = imageNum
    const storageRef = storage.ref()
    //image
    const fileRef = storageRef.child(imageName)
    await fileRef.put(fileData)
    const imageDocs = await fileRef.getDownloadURL()
    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(uniqueId)
      .set({
        cadetName: cadetName,
        cadetSurName:cadetSurName,
        middleName: middleName,
        cadetNumber: cadetNumber,
        email:email,
        locListofCadet: idAllCadet,
        ocNumber:ocNumber,
        course:course,
        gender:gender,
        ethnic:ethnic,

        imageName: imageName,
        image: imageDocs,
      })
      .catch((error) => alert(error))
      updateClass()
      //All Cadet
      await db
      .collection("AllOCSCadet")

      .doc(idAllCadet)
      .set({
        cadetFullName: cadetSurName + " " + middleName + " " + cadetName,
        cadetDataLoc:{
          primary:primaryData,
          first: first,
          CadetDoc:uniqueId,
        },
        cadetNumber: cadetNumber,
        email:email,
        className:className,
        //image
        imageName: imageName,
        image: imageDocs,
      })




    history.push('/occCadet')
  }
  const updateClass = async() => {
    await db
    .collection(primaryData)
    .doc(first)
    .update({
      cadetNum: finalData.cadetNum + 1
    })
    .catch((error) => alert(error))

  }
  


  const handleChangeCadetName = (event) => {
    setCadetName(event.target.value)
  }
  
  const handleChangeMiddleName = (event) => {
    setMiddleName(event.target.value)
  }
  const handleChangeCadetSurName = (event) => {
    setCadetSurName(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangeCadetNumber = (event) => {
    setCadetNumber(event.target.value)
  }
  //
  const handleChangeOcNumber = (event) => {
    setOcNumber(event.target.value)
  }
  const handleChangeCourse = (event) => {
    setCourse(event.target.value)
  }
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const handleChangeEthnic = (event) => {
    setEthnic(event.target.value)
  }

  useEffect(() => {
    var docRef = db.collection(primaryData).doc(first)
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setFinalData(doc.data())
      } else {
        console.log('no document Exist')
      }
    })
  }, [])


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create</strong> <small>News</small>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">
                Choose a <strong>Image</strong> in your File
              </CFormLabel>
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
                  <CFormLabel htmlFor="inputCity">Cadet Name</CFormLabel>
                  <CFormInput id="cadetName" value={cadetName} onChange={handleChangeCadetName} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Cadet SurName</CFormLabel>
                  <CFormInput id="cadetSurName" value={cadetSurName} onChange={handleChangeCadetSurName} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Middle Name</CFormLabel>
                  <CFormInput id="middleName" value={middleName} onChange={handleChangeMiddleName} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Email</CFormLabel>
                  <CFormInput id="email" value={email} onChange={handleChangeEmail} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">OC Number</CFormLabel>
                  <CFormInput id="ocNumber" value={ocNumber} onChange={handleChangeOcNumber} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Cadet Number</CFormLabel>
                  <CFormInput id="cadetNumber" value={cadetNumber} onChange={handleChangeCadetNumber} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Course</CFormLabel>
                  <CFormInput id="course" value={course} onChange={handleChangeCourse} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Gender</CFormLabel>
                  <CFormInput id="gender" value={gender} onChange={handleChangeGender} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Ethnic</CFormLabel>
                  <CFormInput id="ethnic" value={ethnic} onChange={handleChangeEthnic} />
                </CCol>

                <CCol xs={6}>
                  <CButton  onClick={register}>
                    Add With Picture
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

export default AddOCCcadet