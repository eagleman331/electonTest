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
import { db, storage } from '../../../Firebase'
import { TaskContext } from '../../../contexts/TaskContext'

const EditTrain2 = () => {
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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  //
  const [description, setDescription] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageDocs, setImageDocs] = useState({})
  //
  const [videoName, setVideoName] = useState('')
  const [videoDocs, setVideoDocs] = useState({})

  const history = useHistory()
  const toggleImage = () => setNoPict((value) => !value)
  const togglevideo = () => setNoVid((value) => !value)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const onVideoChange = async (e) => {
    const file = e.target.files[0]
    togglevideo()
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

  const updateNOPicture = async () => {
    await db
      .collection(primaryData)
      .doc(first)
      .update({
        author: author,
        title: title,
        category: category,
        description: description,
      })
      .catch((error) => alert(error))
    history.push("/secondLayerTraining")
  }

  const deletePicture = () => {
    console.log('image', imageDocs)
    const storageRef = storage.refFromURL(imageDocs)
    const storageVideoRef = storage.refFromURL(videoDocs)
    storageRef
      .delete()
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
    storageVideoRef
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
    const uniqueVideoId = imageNum

    const storageRef = storage.ref()
    //image
    const fileRef = storageRef.child(uniqueId)
    await fileRef.put(fileData)
    const imagepic = await fileRef.getDownloadURL()
    //video
    const fileVideoRef = storageRef.child(uniqueVideoId)
    await fileVideoRef.put(fileVideoData)
    const videopic = await fileVideoRef.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(second)
      .update({
        imageName: uniqueId,
        image: imagepic,
        videoName: uniqueVideoId,
        video: videopic,
        author: author,
        title: title,
        category: category,
        description: description,
      })
      .catch((error) => alert(error))

    history.push("/secondLayerTraining")
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
    setVideoName(finalData.videoName)
    setVideoDocs(finalData.video)
    setTitle(finalData.title)
    setAuthor(finalData.author)
    setCategory(finalData.category)
    setDescription(finalData.description)
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
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Choose a Picture in your File</CFormLabel>
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
                  <CButton disabled={!noPict || !noVid} onClick={updatePicture}>
                    Update Picture
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CButton onClick={() => history.push("/secondLayerTraining")}>Cancel</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditTrain2
