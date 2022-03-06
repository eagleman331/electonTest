import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'




export const TooltipsPopovers = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <h5>Popover in a modal</h5>
            <p>
              This
              <CPopover title="Popover title" content="Popover body content is set in this property.">
                <CButton>button</CButton>
              </CPopover>{' '}
              triggers a popover on click.
            </p>
            <hr />
            <h5>Tooltips in a modal</h5>
            <p>
              <CTooltip content="Tooltip">
                <CLink>This link</CLink>
              </CTooltip>{' '}
              and
              <CTooltip content="Tooltip">
                <CLink>that link</CLink>
              </CTooltip>{' '}
              have tooltips on hover.
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }
export  const VerticallyCentered = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }