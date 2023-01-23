import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginUser, resetLoginStatus } from "../../../features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./styles.css";

const style = {
  color: '#000',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.login);
  const { statusMessage } = useSelector((store) => store.login);
  const [ modalOpen, setModalOpen ] = useState(false);

  const handleClose = () =>  {
    setModalOpen(false)
    dispatch(resetLoginStatus())
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    if (status === 'error' || status === 'success')
    {
      setModalOpen(true);
    }
  });

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }
      return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });

  return (
    <div className="login">
      <form action="#" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
          <br />
          <input id="email"
            type="text"
            name="email"
            placeholder="Your email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div className="error_message">{formik.errors.email}</div> : null}
        <br />
        <br />
        <label>
          Password
          <br />
          <input
            type="text"
            name="password"
            placeholder="Password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
        {formik.errors.password ? <div className="error_message">{formik.errors.password}</div> : null}
        <br />
        <br />
        <input className="create_btn" value="Login" type="submit" />
      </form>
      <Modal open={modalOpen} onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">{statusMessage}</Typography>
        </Box>
        </Modal>
    </div>
  );
};

export default Login;
