import React, { useState } from 'react'
import {  useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { auth, db } from "./../../../Firebase";
import firebase from 'firebase/compat/app';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [userName, setUserName] = useState("warren");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const register = async (e) => {
    var uuid
    e.preventDefault();
    if (password !== repassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        uuid = authUser.uid
        authUser.user.updateProfile({
          displayName: userName,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      });
    } catch {
      setError("Failed to create an account");
    }
    await db
      .collection("newUsers")
      .doc(uuid)
      .set({
       name:userName,
       email:email,
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch((error) => alert(error));
    setLoading(false)
    history.push("/")
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    
  };
  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangeRepassword = (event) => {
    setRepassword(event.target.value);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username"
                       id="userName"
                       type="text"
                       value= {userName}
                      onChange= {handleChangeName}
                    autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email"
                    type="email"
                    id="email"
                    value= {email}
                    onChange= {handleChangeEmail}
                    autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange= {handleChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"

                  
                      id="repassword"
                
                      value={repassword}
                      onChange= {handleChangeRepassword}
                
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={register} >Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
