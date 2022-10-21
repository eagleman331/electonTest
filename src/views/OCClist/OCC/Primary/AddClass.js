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

const AddClass = () => {
  const [noPict, setNoPict] = useState(false)
  const [noVideo, setNoVideo] = useState(false)
  const history = useHistory()
  const [fileData, setFileData] = useState({})
  const [fileVideoData, setFileVideoData] = useState({})
  const [className, setClassName] = useState(null)
  const [year, setYear] = useState(null)
  const [occClass, setOccClass] = useState(null)
  const [classColor, setClassColor] = useState(null)
  //
  const myUuid = uuid()
  const imageNum = uuid()

  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork

  const labasVideo = () => {
    if (!fileData == null) {
      return (
        <div className="mb-3">
          <CFormLabel htmlFor="formFile">
            Choose a <strong>Video</strong> in your File
          </CFormLabel>
          <CFormInput
            labelText="Company (disabled)"
            id="formFile"
            type="file"
            onChange={onFileChange}
          />
        </div>
      )
    }
  }
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
      .doc(uniqueId)
      .set({
        className: className,
        occClass:occClass,
        year: year,
        classColor:classColor,
        cadetNum: 1,  

        imageName: imageName,
        image: imageDocs,
      })
      .catch((error) => alert(error))

    history.push('/occHome')
  }

  const handleChangeClassName = (event) => {
    setClassName(event.target.value)
  }
  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }
  const handleChangeOCCclass = (event) => {
    setOccClass(event.target.value)
  }
  const handleChangeClassColor = (event) => {
    setClassColor(event.target.value)
  }

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
                  <CFormLabel htmlFor="inputCity">OCC Class</CFormLabel>
                  <CFormInput id="occClass" value={occClass} onChange={handleChangeOCCclass} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Year</CFormLabel>
                  <CFormInput id="year" value={year} onChange={handleChangeYear} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Class Name</CFormLabel>
                  <CFormInput id="className" value={className} onChange={handleChangeClassName} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Class Color</CFormLabel>
                  <CFormInput id="classColor" value={classColor} onChange={handleChangeClassColor} />
                </CCol>

                <CCol xs={6}>
                  <CButton 
                  // disabled={!noPict} 
                  onClick={register}>
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

export default AddClass
