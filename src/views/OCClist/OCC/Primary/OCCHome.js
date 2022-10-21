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
import { db, storage } from '../../../../Firebase'
import { TaskContext } from '../../../../contexts/TaskContext'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'

const OCCcadetHome = () => {
  const { completeWork, setCompleteWOrk, setClassName } = useContext(TaskContext)
  const [data, setData] = useState([])
  const history = useHistory()

  const lipat = (testId) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'OCCHome',
      first: testId.testId,
    }))
    history.push('/occCadet')
  }
  //WhiteArea Data

  const createCard = (e) => {
    //add
    e.preventDefault()
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'OCC',
    }))
    history.push('/occAdd')
  }

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'OCC',
      first: testId.testId,
    }))

    history.push('/occEdit')
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
  const deleteData = (id) => {
    const imageId = id.data.image

    if (imageId !== undefined && null) {
      deletePicture(id)
    }
    const cardData = id.id
    const unsubscribe = db.collection('OCC').doc(cardData).delete()
    return unsubscribe
  }

  useEffect(() => {
    const unsubscribe = db.collection('OCC').onSnapshot((snapshot) =>
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
            <strong>OCC</strong> <small>Home</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Edit This to Fill up necessary Data
            </p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {data.map(({ id, data }, k) => {
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
                          style={{ marginRight: '10rem',width:'10rem' }}
                          color="success"
                          size="sm"
                          shape="rounded-0"
                          onClick={() => {lipat({ testId: id })
                          setClassName(data.className)
                        } }
                        >
                          Next
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
                    style={{ marginRight: '10rem',width: '10rem' }}
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

export default OCCcadetHome
