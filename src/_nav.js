import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'News',
  },
  {
    component: CNavGroup,
    name: 'Government News',
    to: '/newsHome',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'UNTV',
        to: '/newsHome',
      },   
    ],
  },
  {
    component: CNavGroup,
    name: 'Other News',
    to: '/frontEndDataPlatform',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ROTC News',
        to: '/rotcNews',
      },
      {
        component: CNavItem,
        name: 'Labor News',
        to: '/laborNews',
      },    
    ],
  },
  {
    component: CNavTitle,
    name: 'Officer Candidate School',
  },
  {
    component: CNavGroup,
    name: 'OCS',
    to: '/occHome',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'OCC',
        to: '/occHome',
      },
     
    ],
  },
  {
    component: CNavTitle,
    name: 'Reading',
  },
  {
    component: CNavGroup,
    name: 'Bulletin',
    to: '/frontEndDataPlatform',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bulletin',
        to: '/bulletin',
      },
      {
        component: CNavItem,
        name: 'Comics',
        to: '/comics',
      },
     
     
    ],
  },
  {
    component: CNavTitle,
    name: 'People',
  },
  {
    component: CNavItem,
    name: 'EditPeople',
    to: '/manageUsers',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
 
]

export default _nav
