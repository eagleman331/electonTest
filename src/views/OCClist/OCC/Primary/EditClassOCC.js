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

const EditClassOCC = () => {
  const myUuid = uuid()
  //
  const [noPict, setNoPict] = useState(false)
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork
  const stringPath = '/' + primaryData
  const [fileData, setFileData] = useState({})
  const [finalData, setFinalData] = useState([])

  const [className, setClassName] = useState(null)
  const [year, setYear] = useState(null)
  const [occClass, setOccClass] = useState(null)
  const [classColor, setClassColor] = useState(null)

  //

  const [imageName, setImageName] = useState('')
  const [imageDocs, setImageDocs] = useState({})
  //

  const history = useHistory()
  const toggleImage = () => setNoPict((value) => !value)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
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
      .update({
        imageName: uniqueId,
        image: imagepic,

        className: className,
        occClass: occClass,
        year: year,
        classColor: classColor,
      })
      .catch((error) => alert(error))

    history.push(stringPath)
  }

  const deleteData = (first) => {
    db.collection(primaryData).doc(first)
    collection(first).doc(second).delete()
  }
  useEffect(() => {
    var docRef = db.collection(primaryData).doc(first)
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

    setClassName(finalData.className)
    setYear(finalData.year)
    setOccClass(finalData.occClass)
    setClassColor(finalData.classColor)
  }, [finalData])
  const stringData = '/' + primaryData
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
                  <CButton disabled={!noPict} onClick={updatePicture}>
                    Update Picture
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton onClick={() => history.push(stringPath)}>Cancel</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditClassOCC
