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
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

import ReactImg from 'src/assets/images/react.jpg'

import { useHistory } from 'react-router-dom'
import { db, storage } from '../../../Firebase'
import { TaskContext } from '../../../contexts/TaskContext'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'

const Training = () => {
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData,final } = completeWork
  const [data, setData] = useState([])
  const history = useHistory()

  const lipat = (testId) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId,
    }))
    history.push('/trainingDetails')
  }
  //WhiteArea Data

  const createCard = (e) => {
    //add
    e.preventDefault()
    history.push('/addSecondTraining')
  }

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,  
      second: testId.testId,
    }))
    history.push('/editSecTraining')
  }
  //nabago
  const deletePicture = (id) => {
    console.log('id', id)
    const imageId = id.data.image

    const storageRef = storage.refFromURL(imageId)
    storageRef
      .delete()
      .then(() => {
        console.log('Deleted')
      })
      .catch((err) => console.log(err))
  }
  //
  const deleteData = (id) => {
    const imageId = id.data.image

    if (imageId !== undefined && null) {
      deletePicture(id)
    }
    const cardData = id.id
    const unsubscribe = db.collection(primaryData)
    .doc(first)
    .collection(first)
    .doc(cardData).delete()
    return unsubscribe
  }
  //??????????????????wA  organization

  useEffect(() => {
    const unsubscribe = db.collection(primaryData)
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
        <DocsCallout name="Card" href="components/card" />
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Training</strong> <small>Basic</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Edit This to Fill up necessary Narrative
            </p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {data.map(({ id, data }, k) => {
                // console.log("data", data.image)
                return (
                  <CCol xs key={k}>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage style={{height: 150}} orientation="top" alt="none" src={data.image} />
                      <CCardBody>
                        <CCardTitle>{data.alias}</CCardTitle>
                        <CCardText>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </CCardText>
                        <CButton
                          style={{ marginRight: '10rem' }}
                          color="success"
                          size="sm"
                          shape="rounded-0"
                          style={{ width: '10rem' }}
                          onClick={() => lipat({ testId: id })}
                        >
                          Preview
                        </CButton>
                      </CCardBody>
                      <CCardFooter>
                        <CButton onClick={() => editWhiteTP({ testId: id })} color="link">
                          <CIcon icon={cilBell} className="me-2" />
                          Edit Data
                        </CButton>
                        <CButton onClick={() => deleteData({ id, data: data })} color="link">
                          <CIcon icon={cilBell} className="me-2" />
                          Delete
                        </CButton>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                )
              })}
              <CCol xs>
                <CCard style={{ width: '18rem', display: 'flex' }}>
                  <CCardImage orientation="top" src={ReactImg} />
                  <CCardBody>
                    <CCardTitle>Add a Card</CCardTitle>
                    <CCardText>Press Button to Create</CCardText>
                  </CCardBody>
                  <CButton
                    style={{ marginRight: '10rem' }}
                    color="success"
                    size="sm"
                    shape="rounded-0"
                    style={{ width: '10rem' }}
                    onClick={createCard}
                  >
                    Create a Card
                  </CButton>
                  <CCardFooter>
                    <small className="text-medium-emphasis">Last updated 3 mins ago</small>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>


    </CRow>
  )
}

export default Training
