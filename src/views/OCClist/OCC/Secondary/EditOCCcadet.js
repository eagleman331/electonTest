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
import { db, storage } from '../../../../Firebase'
import { TaskContext } from '../../../../contexts/TaskContext'

const EditOCCcadet = () => {
  const imageNum = uuid()
  const myUuid = uuid()
  //
  const [noPict, setNoPict] = useState(false)
  const [noVid, setNoVid] = useState(false)
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork
  const stringPath = '/' + primaryData
  const [fileData, setFileData] = useState({})
  const [fileVideoData, setFileVideoData] = useState({})
  const [finalData, setFinalData] = useState([])
  const [cadetName, setCadetName] = useState(null)
  const [cadetNumber, setCadetNumber] = useState(null)
  const [idAllCadet,setIdAllCadet] = useState(null)

  const [middleName, setMiddleName] = useState(null)
  const [email, setEmail] = useState(null)
  const [cadetSurName, setCadetSurName] = useState(null)
  const [course, setCourse] = useState(null)
  const [gender, setGender] = useState(null)
  const [ethnic, setEthnic] = useState(null)

  const [imageName, setImageName] = useState('')
  const [imageDocs, setImageDocs] = useState({})
  //
  const [videoName, setVideoName] = useState('')

  const history = useHistory()
  const toggleImage = () => setNoPict((value) => !value)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const handleChangeCadetName = (event) => {
    setCadetName(event.target.value)
  }
  const handleChangeCadetNumber = (event) => {
    setCadetNumber(event.target.value)
  }
  const handleChangeCadetSurName = (event) => {
    setCadetSurName(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangeMiddleName = (event) => {
    setMiddleName(event.target.value)
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

  const deletePicture = () => {
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
    //image
    const fileRef = storageRef.child(uniqueId)
    await fileRef.put(fileData)
    const imagepic = await fileRef.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .update({
        imageName: uniqueId,
        image: imagepic,
        cadetName: cadetName.toLowerCase(),
        middleName: middleName.toLowerCase(),
        cadetSurName:cadetSurName.toLowerCase(),
        email:email,
        cadetNumber: cadetNumber,
        
        course:course,
        gender:gender,
        ethnic:ethnic,
      })
      .catch((error) => alert(error))

        await db
        .collection("AllOCSCadet")
        .doc(idAllCadet)
        .update({
          cadetFullName: cadetSurName.toLowerCase() + " " + middleName.toLowerCase() + " " + cadetName.toLowerCase(),
          cadetSurName:cadetSurName.toLowerCase(),
          middleName:middleName.toLowerCase(),
          cadetName:cadetName.toLowerCase(),
          cadetDataLoc:{
            primary:primaryData,
            first: first,
            CadetDoc:uniqueId,
          },
          cadetNumber: cadetNumber,
          email:email,
          //image
          imageName: uniqueId,
          image: imagepic,
        })
        .catch((error) => alert(error))


    history.push("/occCadet")
  }



  const deleteData = (first) => {
    db.collection(primaryData).doc(first)
    collection(first).doc(second).delete()
  }
  useEffect(() => {
    var docRef = db.collection(primaryData).doc(first).collection(first).doc(second)
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setFinalData(doc.data())
      } else {
        console.log('no document Exist')
      }
    })
  }, [])

  useEffect(() => {
    setImageName(finalData.imageName)
    setImageDocs(finalData.image)

    setCadetName(finalData.cadetName)
    setCadetSurName(finalData.cadetSurName)
    setMiddleName(finalData.middleName)
    setEmail(finalData.email)
    setCadetNumber(finalData.cadetNumber)
    setIdAllCadet(finalData.locListofCadet)
  }, [finalData])

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
                  <CButton 
                  // disabled={!noPict} 
                  onClick={updatePicture}>
                    Update Picture
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton onClick={() => history.push("/occCadet")}>Cancel</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditOCCcadet
