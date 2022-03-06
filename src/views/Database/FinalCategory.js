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



const FinalCategory = () => {
  const {completeWork, setCompleteWOrk } = useContext(TaskContext);
  const { first, second, primaryData,final } = completeWork
  const [dataSecond, setDataSecond] = useState([])

  const history = useHistory();

  const lipat = (testId) => {
  //next
    setCompleteWOrk((prevState) => ({
      ...prevState,
      targetdata: testId.testId
  
  }));
    history.push("/dataDetails");
  };

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      targetdata: testId.testId
  }));
    history.push("/EditFinal");
  }
  //
const deletePicture = (id) => {
  //delete
    const imageId = id.data.image
  
    const storageRef = storage.refFromURL(imageId);
    storageRef.delete().then(() => {
      console.log("Deleted")
  }).catch(err => console.log(err))

  };

const deleteData = (id) => {
  const imageId = id.data.image
  if(imageId !== undefined && null) {
    deletePicture(id)
  }
  const cardData = id.id
  console.log("image",cardData)
  const unsubscribe = db.collection(primaryData)
  .doc(first)
  .collection(first)
  .doc(second)
  .collection(second)
  .doc(final)
  .collection(final)
  .doc(cardData)
  .delete()      
    return unsubscribe;
}
//
 
  const addData = (e) => {
    e.preventDefault();
    history.push("/addFinal");
  };
  useEffect(() => {
    const unsubscribe = db.collection(primaryData)
        .doc(first)
        .collection(first)
        .doc(second)
        .collection(second)
        .doc(final)
      .collection(final)
        .onSnapshot((snapshot) =>
            setDataSecond(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

    return unsubscribe;
}, []);
console.log("Primary", primaryData)
console.log("first", first)
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
              {dataSecond.map(({ id, data }, k) => {
                // console.log("data", data.image)
                return (
                  <CCol xs>
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage orientation="top"     alt="none" src={data.image} 
                      
                      />
                      <CCardBody>
                        <CCardTitle>{data.alias}</CCardTitle>
                        <CCardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </CCardText><CButton style={{marginRight:"10rem"}}
                    color="success"
                    size="sm"
                    shape="rounded-0"
                    style={{ width: '10rem' }}
                    onClick= {() => lipat({ testId: id })} 
                  >
                  Next
                  </CButton>
                      </CCardBody>
                      <CCardFooter>
                      <CButton 
                      onClick={() => editWhiteTP({ testId: id })}
                      color="link">
                      <CIcon icon={cilBell} className="me-2" />
                      Edit Data
                    </CButton>
                    <CButton 
                       onClick={() => deleteData({ id, data: data })}
                      color="link">
                      <CIcon icon={cilBell} className="me-2" />
                      Delete
                    </CButton>
                  
                      </CCardFooter>
                    </CCard>
                  </CCol>
                )
              })}
              <CCol xs>
                <CCard style={{ width: '18rem',display:"flex" }}>
                  <CCardImage orientation="top" src={ReactImg} />
                  <CCardBody>
                    <CCardTitle>Add a Card</CCardTitle>
                    <CCardText>Press Button to Create</CCardText>
                  </CCardBody>
                  <CButton style={{marginRight:"10rem"}}
                    color="success"
                    size="sm"
                    shape="rounded-0"
                    style={{ width: '10rem' }}
                    onClick={addData}
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

export default FinalCategory
