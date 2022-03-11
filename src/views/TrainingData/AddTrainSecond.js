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
import { db, storage } from './../../Firebase'
import { TaskContext } from './../../contexts/TaskContext'

const AddDataTraining = () => {
  const [noPict, setNoPict] = useState(false)
  const history = useHistory()
  const [fileData, setFileData] = useState({})
  const [author, setAuthor] = useState(null)
  const [category, setCategory] = useState(null)
  const [title, setTitle] = useState(null)
  const [videoName, setVideoName] = useState('')
  const [finalData, setFinalData] = useState([])

  //
  const [description, setDescription] = useState(null)
  const myUuid = uuid()
  const imageNum = uuid()

  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
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
        author: author,
        title: title,
        category: category,
        imageName: imageName,
        image: imageDocs,
        videoName: videoName,
        description: description,
      })
      .catch((error) => alert(error))
      updateTraingCard()
  
    history.push('/secondLayerTraining')
  }
  const updateTraingCard = async() => {
    await db
    .collection(primaryData)
    .doc(first)
    .update({
      videoNum: finalData.videoNum + 1
    })
    .catch((error) => alert(error))

  }
  


  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeVideoName = (event) => {
    setVideoName(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
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
                  <CFormLabel htmlFor="inputCity">Title</CFormLabel>
                  <CFormInput id="title" value={title} onChange={handleChangeTitle} />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">category</CFormLabel>
                  <CFormInput id="category" value={category} onChange={handleChangeCategory} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Author</CFormLabel>
                  <CFormInput id="author" value={author} onChange={handleChangeAuthor} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Video</CFormLabel>
                  <CFormInput id="videoName" value={videoName} onChange={handleChangeVideoName} />
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
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddDataTraining
