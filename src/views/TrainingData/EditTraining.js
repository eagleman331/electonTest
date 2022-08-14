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

const EditTraining = () => {
  const imageNum = uuid()
  const videoNum = uuid()
  const history = useHistory()

  const toggleImage = () => setNoPict((value) => !value)
  const toggleVideo = () => setNoVideo((value) => !value)
  //
  const [noPict, setNoPict] = useState(false)
  const [noVideo, setNoVideo] = useState(false)

  
  const [fileData, setFileData] = useState({})
  const [finalData, setFinalData] = useState([])

  const [fileVideoData, setFileVideoData] = useState({})
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [category, setCategory] = useState(null)
  const [description, setDescription] = useState(null)


  //
  const [imageName, setImageName] = useState(null)
  const [imageDocs, setImageDocs] = useState({})
  const [videoName, setVideoName] = useState(null)
  const [video, setVideo] = useState({})


//Context
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork

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

  const deletePicture = () => {

    const storageRef = storage.refFromURL(imageDocs)
    storageRef
      .delete()
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }
  const deleteVideos = () => {
    const storageRef = storage.refFromURL(video)
    storageRef
      .delete()
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }
  const stringPath = '/' + primaryData
  const updatePicture = async () => {

    const imageTempNum = imageNum
    const videoTempNum = videoNum
  
    if (fileData !== null) {
      deletePicture()
    }
    // if (fileVideoData !== null) {
    //   deleteVideos()
    // }
    const storageRef = storage.ref()
    //image
    const fileRef = storageRef.child(imageTempNum)
    await fileRef.put(fileData)
    const imagepic = await fileRef.getDownloadURL()
    //video
    const fileVideoRef = storageRef.child(videoTempNum)
    await fileVideoRef.put(fileVideoData)
    const videoDocs = await fileVideoRef.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(first)
      .update({
        imageName: imageTempNum,
        image: imagepic,
        // videoName: videoTempNum,
        video: video,
        // author: author,
        // title: title,
        // category: category,
        // description: description,
      })
      .catch((error) => alert(error))

    history.push("/trainingHome")
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
    setVideo(finalData.video)
    setVideoName(finalData.videoName)
    setTitle(finalData.title)
    setAuthor(finalData.author)
    setCategory(finalData.category)
    setDescription(finalData.description)
  }, [])
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
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">
                Need Image to Choose a <strong>Video</strong> in your File
              </CFormLabel>
              <CFormInput
                labelText="Company (disabled)"
                id="formFile"
                type="file"
                onChange={onVideoChange}
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
                  <CButton onClick={updatePicture}>Update Video</CButton>
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

export default EditTraining
