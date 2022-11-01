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
import { query, where, orderBy, limit, collection, getDocs } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import { db, storage } from '../../../../Firebase'
import { TaskContext } from '../../../../contexts/TaskContext'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'

const Training = () => {
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { first, second, primaryData, final } = completeWork
  const [data, setData] = useState([])
  const [testData, setTestData] = useState([])
  const history = useHistory()

  const OCC = collection(db, 'AllOCSCadet')

  const createCard = (e) => {
    e.preventDefault()
    history.push('/occCadetAdd')
  }

  const updateClass = async () => {
    await db
      .collection(primaryData)
      .doc(first)
      .update({
        cadetNum: finalData.cadetNum - 1,
      })
      .catch((error) => alert(error))
  }
  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId,
    }))
    history.push('/occCadetEdit')
  }
  //nabago
  const deletePicture = (id) => {
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
  const deleteInList = async() => {
    await db
    .collection("AllOCSCadet")
    .doc(data.locListofCadet)
    .delete()
  }
  const deleteData = (id) => {
    updateClass()
    deleteInList()
    const imageId = id.data.image

    if (imageId !== undefined && null) {
      deletePicture(id)
    }
    const cardData = id.id
    const unsubscribe = db
      .collection(primaryData)
      .doc(first)
      .collection(first)
      .doc(cardData)
      .delete()
    return unsubscribe

   
   
  }


  useEffect(() => {
    const unsubscribe = db
      .collection(primaryData)
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

  useEffect(() => {
    const unsubscribe = db
      .collection('AllOCSCadet')
      .orderBy("cadetFullName")
      .get()
      .then((snapshot) =>
        setTestData(
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
            <strong>Cadet</strong> <small>Home</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">Edit This to Fill up necessary Narrative</p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {data.map(({ id, data }, k) => {
                return (
                  <CCol xs key={k}>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage
                        style={{ height: 150 }}
                        orientation="top"
                        alt="none"
                        src={data.image}
                      />
                      <CCardBody>
                        <CCardTitle>{data.cadetSurName}</CCardTitle>
                        <CCardText>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </CCardText>
                        {/* <CButton
                          style={{ marginRight: '10rem' }}
                          color="success"
                          size="sm"
                          shape="rounded-0"
                          style={{ width: '10rem' }}
                          onClick={() => lipat({ testId: id })}
                        >
                          Preview
                        </CButton> */}
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
                    style={{ marginRight: '10rem', width: '10rem' }}
                    color="success"
                    size="sm"
                    shape="rounded-0"
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
