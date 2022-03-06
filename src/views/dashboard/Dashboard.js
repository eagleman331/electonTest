import React, { lazy, useContext, useEffect, useState } from 'react'


import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'


const admin = require("firebase-admin")



import {cilMinus, cilPenAlt  } from '@coreui/icons'
import { db, functions } from './../../Firebase'


import { AuthContext } from '../../contexts/AuthContext'
import { Alert } from '@coreui/coreui'

const WidgetHome = lazy(() => import('../widgets/WidgetHome.js'))


const Dashboard = () => {
  const [people, setPeople] = useState([])

  const [unit, setUnit] = useState('newUser')
  const [admin, setAdmin] = useState(false)


  const [user, setUser] = useState(null)

  const [uid, setUid] = useState(null)
  

 

  const changeUserRole = () => {
    const AddUnit = functions.httpsCallable('addUserRole')
    AddUnit({ email: user, unit: unit }).then((result) => {
      console.log('result', result)
    })
    db.collection('users').doc(uid).update({
      unit: unit,
    })
    setVisible(false)
  }
  const addAdminRole = () => {
    const AddUnit = functions.httpsCallable('addAdminRole')
    if (admin == true) {
      AddUnit({ email: user }).then((result) => {
        console.log('result', result)
      })
      db.collection('users').doc(uid).update({
        admin: true,
      })
    } else {
      db.collection('users').doc(uid).update({
        admin: false,
      })
    }
    setVisible(false)
  }

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) =>
      setPeople(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    )
  }, [])



  return (
    <>
      <WidgetHome />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Application Users</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">UID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Unit</CTableHeaderCell>

                    <CTableHeaderCell className="text-center">Admin</CTableHeaderCell>
               
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {people.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={avatar1} status={'success'} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.name}</div>
                        <div className="small text-medium-emphasis">{item.data.email}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item.id}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div>{item.data.unit}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CButton
                          variant="ghost"
                        
                        >
                          {item.data.admin ? 'true' : 'false'}
                        </CButton>
                      </CTableDataCell>

                     

                     
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
