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

import ReactImg from 'src/assets/images/react.jpg'



import { useHistory } from "react-router-dom";
import { db, storage } from "./../../Firebase";
import { TaskContext } from "./../../contexts/TaskContext";
import CIcon from '@coreui/icons-react';
import { cilBell } from '@coreui/icons'

const DatadetailsView = () => {
  const {completeWork, setCompleteWOrk } = useContext(TaskContext);
  const { first, second, final, targetdata, primaryData } = completeWork
  const [finalData, setFinalData] = useState({})

  const history = useHistory();

 
  const editWhiteTP = (testId) => {
    //edit
 
    history.push("/EditFinal");
  }



  useEffect(() => {
    var docRef = db
        .collection(primaryData)
        .doc(first)
        .collection(first)
        .doc(second)
        .collection(second)
        .doc(final)
        .collection(final)
        .doc(targetdata)
        docRef.get().then(function(doc){
          if (doc.exists) {
            setFinalData(doc.data())
          } else{
            console.log("no document Exest")
          }
        })
     
    
}, []);
console.log("final",finalData.image)

  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Card" href="components/card" />
      </CCol>
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Card</strong> <small>Image caps</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Similar to headers and footers, cards can include top and bottom &#34;image
              caps&#34;—images at the top or bottom of a card.
            </p>
            <DocsExample href="components/card/#image-caps">
              <CRow>
                <CCol lg={6}>
                  <CCard className="mb-3">
                  <CCardImage orientation="top"     alt="none" src={finalData.image} 
                      
                      />
                    <CCardBody>
                      <CCardTitle>{finalData.name} {"  "}{finalData.surname} </CCardTitle>
                      <CCardText>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </CCardText>
                      <CCardText>
                        <small className="text-medium-emphasis">Last updated 3 mins ago</small>
                      </CCardText>
                    </CCardBody>
                    <CCardFooter>
                      <CButton 
                      onClick={() => editWhiteTP()}
                      color="link">
                      <CIcon icon={cilBell} className="me-2" />
                      Edit Data
                    </CButton>                
                  
                      </CCardFooter>
                  </CCard>
                </CCol>
              
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
     
      
     
    </CRow>
  )
}

export default DatadetailsView
