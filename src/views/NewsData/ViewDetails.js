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



const ViewDetails = () => {
  const {completeWork, setCompleteWOrk } = useContext(TaskContext);
  const { first, second, primaryData } = completeWork
  const [dataPreview, setDataPreview] = useState([])
  const [dataSecond, setDataSecond] = useState([])

  const history = useHistory();

  const lipat = (testId) => {
  //next
    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId
  
  }));
    history.push("/secondCategory");
  };

  const editWhiteTP = (testId) => {
    //edit
    setCompleteWOrk((prevState) => ({
      ...prevState,
      second: testId.testId
  }));
    history.push("/EditFirst");
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
  const unsubscribe = db.collection(primaryData)
  .doc(first)
  .collection(first)
  .doc(cardData)
  .delete()      
    return unsubscribe;
}
//
 
  const addData = (e) => {
    e.preventDefault();
    history.push("/addFirst");
  };

useEffect(() => {
  const unsubscribe = db.collection(primaryData)
      .doc(first)
      .get().then(function (doc) {
        if (doc.exists) {
          setDataPreview(doc.data());
        } else {
        }
      });
 

  return unsubscribe;
}, []);
  return (
    <CRow>
            <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Title</strong> <small> {dataPreview.title}</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              TRY TO Make it Better
            </p>
         
              <CRow>
                <CCol lg={8}>
                  <CCard className="mb-3">
                    <CCardImage orientation="top" src={dataPreview.image} />
                    <CCardBody>
                      <CCardTitle>{dataPreview.author}</CCardTitle>
                      <CCardText>
                      {dataPreview.description}
                      </CCardText>
                      <CCardText>
                        <small className="text-medium-emphasis">Last updated 3 mins ago</small>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
               
              </CRow>
       
          </CCardBody>
        </CCard>
      </CCol>
            
 
    </CRow>
  )
}

export default ViewDetails
