import React, { useContext, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { useHistory } from 'react-router-dom'

import ReactImg from 'src/assets/images/react.jpg'
import { db, storage } from '../../../Firebase'
import { TaskContext } from 'src/contexts/TaskContext'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import { getStorage, ref, deleteObject } from 'firebase/storage'

const ActualPaper = () => {
  const [data, setData] = useState([])
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData } = completeWork

  const history = useHistory()

  const lipat = (testId) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId,
    }))
    history.push('/paper3')
  }
  //WhiteArea Data

  const createCard = (e) => {
    //add
    e.preventDefault()
    history.push('/addPaper2')
  }

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId,
    }))
    history.push('/editPaper2')
  }
  //nabago
  const storage = getStorage()
  const deletePicture = (id) => {
    const imageId = id.data.imageName
    const desertRef = ref(storage, imageId)
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        console.log("error", error)
      })
  }
  //
  const deleteData = (id) => {
    const imageId = id.data.imageName
    
    if (imageId === undefined && null) {
    }else{ deletePicture(id)}
    const cardData = id.id
    const unsubscribe = 
    db.collection(primaryData)
    .doc(first)
    .collection(first)
    .doc(cardData)
    .delete()
    return unsubscribe
  }

  useEffect(() => {
    const unsubscribe = 
    db.collection(primaryData)
    .doc(first)
    .collection(first)
    .onSnapshot((snapshot) =>
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    )
  }, [])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add</strong> <small> New News</small>
          </CCardHeader>
          <CCardBody>
            <CButton
              style={{ marginRight: '10rem' }}
              color="success"
              size="sm"
              shape="rounded-0"
              style={{ width: '10rem' }}
              onClick={createCard}
            >
              Create Paper Topic
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>News</strong> <small> On Philippines</small>
          </CCardHeader>
          <CCardBody>
            {data.map(({ id, data }, k) => {
              return (
                <CCard key={k}>
                  <CCardHeader>Title: {data.title}</CCardHeader>
                  <CCardBody>
                    <>
                      <CCard style={{ width: '18rem' }}>
                        <CCardImage style={{ height: 180 }} orientation="top" src={data.image} />
                      </CCard>
                      <CCard>
                        <CCardBody>
                          <CCardTitle>Title: {data.title}</CCardTitle>
                          <CCardText>Author: {data.author}</CCardText>
                          <CCardText>Narrative: {data.narrative}</CCardText>

                          <CButton
                            style={{ marginRight: '10rem' }}
                            color="success"
                            size="sm"
                            shape="rounded-0"
                            style={{ width: '10rem' }}
                            onClick={() => lipat({ testId: id })}
                          >
                            Preview News
                          </CButton>

                          <CButton
                            onClick={() => editWhiteTP({ testId: id })}
                            style={{ marginLeft: 50 }}
                            color="primary"
                            variant="ghost"
                          >
                            Edit
                          </CButton>
                          <CButton
                            onClick={() => deleteData({ id, data: data })}
                            color="secondary"
                            variant="ghost"
                          >
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCard>
                    </>
                  </CCardBody>
                </CCard>
              )
            })}

            <br />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ActualPaper
