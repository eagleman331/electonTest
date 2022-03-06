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
import { db, storage } from '../../Firebase'
import { TaskContext } from '../../contexts/TaskContext'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'

const frontEndDataPlatform = () => {
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const [whiteAreaData, setWhiteAreaData] = useState([])
  const [organizationData, setOrganizationData] = useState([])
  const [buildData, setBuildData] = useState([])

  const history = useHistory()

  const lipat = (testId) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'whiteArea',
      first: testId.testId,
    }))
    history.push('/unangsabak')
  }
  //WhiteArea Data

  const lipatEdit = (e) => {
    //add
    e.preventDefault()
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'whiteArea',
    }))
    history.push('/addDataMainMenu')
  }

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'whiteArea',
      first: testId.testId,
    }))
    history.push('/EditDataMainMenu')
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
    const unsubscribe = db.collection('whiteArea').doc(cardData).delete()
    return unsubscribe
  }
  //??????????????????wA  organization
  const lipatOrg = (testId) => {
    //next
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organization',
      first: testId.testId,
    }))
    history.push('/unangsabak')
  }

  const lipatEditOrg = (e) => {
    //add
    e.preventDefault()
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organization',
    }))
    history.push('/addDataMainMenu')
  }

  const editWhiteTPOrg = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organization',
      first: testId.testId,
    }))
    history.push('/EditDataMainMenu')
  }
  const deleteDataOrg = (id) => {
    const imageId = id.data.image

    if (imageId !== undefined && null) {
      deletePicture(id)
    }
    const cardData = id.id
    const unsubscribe = db.collection('organization').doc(cardData).delete()
    return unsubscribe
  }

  ///building
  const lipatBuild = (testId) => {
    //next
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organizing',
      first: testId.testId,
    }))
    history.push('/unangsabak')
  }

  const lipatEditBuild = (e) => {
    //add
    e.preventDefault()
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organizing',
    }))
    history.push('/addDataMainMenu')
  }

  const editWhiteTPBuild = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'organizing',
      first: testId.testId,
    }))
    history.push('/EditDataMainMenu')
  }

  const deleteDataBuild = (id) => {
    const imageId = id.data.image

    if (imageId !== undefined && null) {
      deletePicture(id)
    }
    const cardData = id.id
    const unsubscribe = db.collection('organizing').doc(cardData).delete()
    return unsubscribe
  }

  useEffect(() => {
    const unsubscribe = db.collection('whiteArea').onSnapshot((snapshot) =>
      setWhiteAreaData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    )
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('organization').onSnapshot((snapshot) =>
      setOrganizationData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    )
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('organizing').onSnapshot((snapshot) =>
      setBuildData(
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
            <strong>Card</strong> <small>White Area</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Edit This to Fill up necessary Narrative
            </p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {whiteAreaData.map(({ id, data }, k) => {
                // console.log("data", data.image)
                return (
                  <CCol xs key={k}>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage orientation="top" alt="none" src={data.image} />
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
                    style={{ marginRight: '10rem' }}
                    color="success"
                    size="sm"
                    shape="rounded-0"
                    style={{ width: '10rem' }}
                    onClick={lipatEdit}
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

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Organizations</strong> <small>Organizations</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Edit This to Fill up necessary Narrative
            </p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {organizationData.map(({ id, data }, k) => {
                // console.log("data", data.image)
                return (
                  <CCol xs key={k}>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage orientation="top" alt="none" src={data.image} />

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
                          onClick={() => lipatOrg({ testId: id })}
                        >
                          Next
                        </CButton>
                      </CCardBody>
                      <CCardFooter>
                        <CButton onClick={() => editWhiteTPOrg({ testId: id })} color="link">
                          <CIcon icon={cilBell} className="me-2" />
                          Edit
                        </CButton>
                        <CButton onClick={() => deleteDataOrg({ id, data: data })} color="link">
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
                    onClick={lipatEditOrg}
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

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Training</strong> <small>Training</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            Edit This to Fill up necessary Narrative
            </p>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
              {buildData.map(({ id, data }, k) => {
                // console.log("data", data.image)
                return (
                  <CCol xs key={k}>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage orientation="top" alt="none" src={data.image} />
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
                          onClick={() => lipatBuild({ testId: id })}
                        >
                          Next
                        </CButton>
                      </CCardBody>
                      <CCardFooter>
                        <CButton onClick={() => editWhiteTPBuild({ testId: id })} color="link">
                          <CIcon icon={cilBell} className="me-2" />
                          Edit
                        </CButton>
                        <CButton onClick={() => deleteDataBuild({ id, data: data })} color="link">
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
                    onClick={lipatEditBuild}
                  >
                    Create a Folder
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

export default frontEndDataPlatform
