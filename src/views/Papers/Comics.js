import React from 'react'
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

const Cards = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Card</strong> <small>Header and footer</small>
          </CCardHeader>
          <CCardBody>
            <CCard>
              <CCardHeader>Comics</CCardHeader>
              <CCardBody>
                <>
                  <CCard style={{ width: '18rem' }}>
                    <CCardImage orientation="top" src={ReactImg} />
                  </CCard>
                  <CCard>
                    <CCardBody>
                      <CCardTitle>Special title treatment</CCardTitle>
                      <CCardText>
                        With supporting text below as a natural lead-in to additional content.
                      </CCardText>
                      <CButton href="#">Go somewhere</CButton>
                    </CCardBody>
                  </CCard>
                </>
                
              </CCardBody>
            </CCard>
            <br />
            

          </CCardBody>
        </CCard>
      </CCol>

      
     
   
    </CRow>
  )
}

export default Cards
