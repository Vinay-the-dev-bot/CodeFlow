// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// // import { url } from '../api';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//         Code Flow{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme();

// export default function Login() {

//   const [email, setEmail] = React.useState(''); // State variable for email
//   const [password, setPassword] = React.useState(''); // State variable for password
//   const [alertMessage, setAlertMessage] = React.useState('');
//   const [alertSeverity, setAlertSeverity] = React.useState('success');
//   const [showAlert, setShowAlert] = React.useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // console.log({
//     //   email,
//     //   password,
//     // });
//     const data={
//         email,
//         password
//     }
//     axios.post(`${url}/users/login`,data)
//     .then((res) => {
//       if (res.data.message === "Logged Successfully") {
//         Cookies.set("token",res.data.token, { expires: 365 });
//         Cookies.set("user",res.data.user.userName, { expires: 365 });
//         Cookies.set("userId",res.data.user._id, { expires: 365 });
//         if(res.data.user.userName == "admin"){
//           Cookies.set("isAdmin",res.data.user.userName, { expires: 365 });
//         }
//         setAlertSeverity('success');
//         setAlertMessage('Logged Successfully');
//       }
//       else {
//         setAlertSeverity('error');
//         setAlertMessage(res.data.message);
//       }
//       setShowAlert(true);
//     })
//     .catch((err) => console.log(err));
//   };
//  const nav=useNavigate();
//   React.useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => {
//         setShowAlert(false);
//         if(alertSeverity==="success"){
//           nav(-2);
//       }
//       }, 2000)
//       return () => clearTimeout(timer);
//     }
//   }, [showAlert]);

//   return (
//     <div>
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 2,
//             marginBottom: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Log in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Update email state
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update password state
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Log In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//       {showAlert && (
//           <Stack
//           sx={{
//             width: ["48%", "20%"],
//             position: 'fixed',
//             top: ['90%'],
//             right: '0.1%',
//             transform: 'translate(-30%, -30%)',
//           }}
//           spacing={2}
//         >
//           <Alert variant="filled" severity={alertSeverity}>
//             {alertMessage}
//           </Alert>
//         </Stack>
//       )}
//     </ThemeProvider>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLinLout, setName } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        pass,
      });
      console.log(response.data.token);
      console.log(response.data);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        await Promise.all([
          dispatch(authLinLout(true)),
          dispatch(setName(response.data.name)),
        ]);
        setModalMessage("Login successful");
        setShowModal(true);
        // navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setModalMessage("Please register yourself");
      setShowModal(true);
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Login successful") {
      navigate("/");
    }
  };

  return (
    <Flex
      color="black"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} width="30%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center" mb={4}>
          <h1 style={{ fontSize: "40px", fontWeight: "700" }}>Login</h1>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button width="full" type="submit">
            Log In
          </Button>
        </form>
      </Box>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Status</ModalHeader>
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Login;
