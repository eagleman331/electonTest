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
import firebase from 'firebase/compat/app';

import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { db, storage } from './../../../Firebase'
import { TaskContext } from './../../../contexts/TaskContext'

const AddBulletin = () => {
  const [noPict, setNoPict] = useState(false)
  const [noPict2, setNoPict2] = useState(false)
  //
  const [what,setWhat] = useState("")
  const [when,setWhen] = useState("")
  const [where,setWhere] = useState("")
  const [who,setWho] = useState("")
  //
  const history = useHistory()
  const [fileData, setFileData] = useState({})
  const [fileData2, setFileData2] = useState({})
  const [fileVideoData, setFileVideoData] = useState({})
  const [author, setAuthor] = useState(null)
  const [category, setCategory] = useState(null)
  const [title, setTitle] = useState(null)
  //
  const [description, setDescription] = useState(null)
  const myUuid = uuid()
  const imageNum = uuid()
  const imageNum2 = uuid()

  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { primaryData } = completeWork

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
  const toggleImage2 = () => setNoPict2((value) => !value)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    toggleImage()
    setFileData(file)
  }
  const onFileChange2 = async (e) => {
    const file = e.target.files[0]
    toggleImage2()
    setFileData2(file)
  }
  const register = async () => {
    const uniqueId = myUuid
    const imageName = imageNum
    const imageName2 = imageNum2
    const storageRef = storage.ref()
    //image
    const fileRef = storageRef.child(imageName)
    await fileRef.put(fileData)
    const imageDocs = await fileRef.getDownloadURL()
    //image2
    const fileRef2 = storageRef.child(imageName2)
    await fileRef2.put(fileData2)
    const imageDocs2 = await fileRef2.getDownloadURL()

    await db
      .collection(primaryData)
      .doc(uniqueId)
      .set({
        author: author,
        title: title,
        category: category,
        imageName: imageName,
        image: imageDocs,
        imageName2: imageName2,
        background: imageDocs2,
        description: description,
        participants: who,
        program:what,
        time:when,
        location:where,   
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch((error) => alert(error))

    history.push('/bulletin')
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
  //
  const handleChangeWhat = (event) => {
    setWhat(event.target.value)
  }
  const handleChangeWhen = (event) => {
    setWhen(event.target.value)
  }
  const handleChangeWhere = (event) => {
    setWhere(event.target.value)
  }
  const handleChangeWho = (event) => {
    setWho(event.target.value)
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
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">
                Choose a <strong>Backgound</strong> in your File
              </CFormLabel>
              <CFormInput
                labelText="Company (disabled)"
                id="formFile"
                type="file"
                onChange={onFileChange2}
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
                  <CFormLabel htmlFor="inputCity">Participants</CFormLabel>
                  <CFormInput id="who" value={who} onChange={handleChangeWho} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Time</CFormLabel>
                  <CFormInput id="when" value={when} onChange={handleChangeWhen} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Location</CFormLabel>
                  <CFormInput id="where" value={where} onChange={handleChangeWhere} />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Program</CFormLabel>
                  <CFormInput id="what" value={what} onChange={handleChangeWhat} />
                </CCol>
              

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    fullWidth={true}
                    value={description}
                    onChange={handleChangeDescription}
                  ></CFormTextarea>
                </div>

                <CCol xs={6}>
                  <CButton disabled={!noPict || !noPict2} onClick={register}>
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

export default AddBulletin
