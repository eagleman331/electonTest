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
  const [noVideo,setNoVideo] = useState(false)
  const history = useHistory()
  const [fileData, setFileData] = useState({})
  const [fileVideoData, setFileVideoData] = useState({})
  const [author, setAuthor] = useState(null)
  const [category, setCategory] =useState(null)
  const [title, setTitle] =useState(null)
  // 
  const [description, setDescription] = useState(null)
  const myUuid = uuid()
  const imageNum = uuid()
  const videoNum = uuid()
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork

  const labasVideo =() => {
    if (!fileData == null) {
      return (
        <div className="mb-3">
        <CFormLabel htmlFor="formFile">Choose a <strong>Video</strong> in your File</CFormLabel>
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
  const toggleVideo = () => setNoVideo((value) => !value)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const onVideoChange = async (e) => {
    const file = e.target.files[0]
    toggleVideo()
    setFileVideoData(file)
  }
  const register = async () => {
    const uniqueId = myUuid
    const imageName = imageNum
    const VideoName = videoNum
    const storageRef = storage.ref()
    //image
    const fileRef = storageRef.child(imageName)
    await fileRef.put(fileData)
    const imageDocs = await fileRef.getDownloadURL()
    //video
    const fileVideoRef = storageRef.child(VideoName)
    await fileVideoRef.put(fileVideoData)
    const videoDocs = await fileVideoRef.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(uniqueId)
      .set({
        author:author,
        title:title,
        category:category,
        imageName: imageName,
        image: imageDocs,
        videoName: VideoName,
        video: videoDocs,
        description: description,
      })
      .catch((error) => alert(error))

    history.push('/trainingHome')
  }
  const registerNoimage = async () => {
    const uniqueId = myUuid
    await db
      .collection(primaryData)
      .doc(uniqueId)
      .set({
        author:author,
        title:title,
        category:category,
        description: description,
      })
      .catch((error) => alert(error))

    history.push('/trainingHome')
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

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
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
              <CFormLabel htmlFor="formFile">Choose a <strong>Image</strong> in your File</CFormLabel>
              <CFormInput
                labelText="Company (disabled)"
                id="formFile"
                type="file"
                onChange={onFileChange}
              />
            </div>

            {/* <br />
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Need Image to Choose a <strong>Video</strong> in your File</CFormLabel>
              <CFormInput
                labelText="Company (disabled)"
                id="formFile"
                type="file"
                disabled={!noPict}
                onChange={onVideoChange}
              />
            </div> */}
     
               
            
            
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
