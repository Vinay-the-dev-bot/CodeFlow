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
// import axios from "axios";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import {useNavigate} from "react-router-dom";
// // import { url } from '../api';

// function SignUP() {
//   // const url = "http://localhost:4500/users/register";
//   const url = "http://localhost:4500/users/register";
//   const defaultTheme = createTheme();
//   // Define state variables for storing user input
//   const [firstName, setFirstName] = React.useState('');
//   const [lastName, setLastName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [alertMessage, setAlertMessage] = React.useState('');
//   const [alertSeverity, setAlertSeverity] = React.useState('success');
//   const [showAlert, setShowAlert] = React.useState(false); 
//     const nav=useNavigate();

//   // const isAuth=Cookies.get("token");

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   // You can access the user input values from the state variables
//   //   console.log({
//   //     firstName,
//   //     lastName,
//   //     email,
//   //     password,
//   //   });
//   //   const newData={
//   //       name:firstName,
//   //       email:email,
//   //       pass:password
//   //   }

//   //   axios.post(`${url}`, newData)
//   //   .then((res) => {
//   //     if (res.data.message === "Registered Successfully") {
//   //       setAlertSeverity('success');
//   //       setAlertMessage('Registered Successfully');
//   //     } 
//   //     else {
//   //       setAlertSeverity('error');
//   //       setAlertMessage(res.data.message);
//   //     }
//   //     setShowAlert(true);
//   //   })
//   //   .catch((err) => console.log(err));
//   // };
  
//   React.useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => {
//         setShowAlert(false);
//         if(alertSeverity==="success"){
//             nav("/login");
//         }
//       }, 2000)
//       return () => clearTimeout(timer);
//     }
//   }, [showAlert]);



//   const handleSubmit = async (e) => {
//     e.preventDefault();
        
//     const obj={
//       name:firstName,
//       email:email,
//       pass:password
//     }
//     console.log(obj);
//     fetch("http://localhost:4500/users/register",{
//   method: 'POST', 
//   headers: {
//     'Content-Type': 'application/json', 
//   },
//   body: JSON.stringify(obj),
// })
//   .then(response => response.json())
//   .then(data => {
//     if (res.data.message === "Registered Successfully") {
//             setAlertSeverity('success');
//             setAlertMessage('Registered Successfully');
//           } 
//           else {
//             setAlertSeverity('error');
//             setAlertMessage(res.data.message);
//           }
//           setShowAlert(true);
//     console.log(data);
//   })
//   .catch(error => console.error('Error:', error));
//   }

  

//   return (
//    <div>
//     <ThemeProvider theme={defaultTheme}>
       
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 2,
//             marginBottom:4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
                  
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive latest and weekly questions/contest updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Log in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//       {showAlert && (
//         <Stack
//         sx={{
//           width: ["48%", "20%"],
//           position: 'fixed',
//           top: ['90%'], 
//           right: '0.1%', 
//           transform: 'translate(-30%, -30%)',
//         }}
//         spacing={2}
//       >
//           <Alert variant="filled" severity={alertSeverity}>
//             {alertMessage}
//           </Alert>
//         </Stack>
//       )}
//     </ThemeProvider>
//    </div>
//   );
// }

// export default SignUP;


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

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        {
          name,
          email,
          pass
        }
      );
      setShowModal(true);
      setModalMessage("Registration successful");
    } catch (error) {
      setShowModal(true);
      if (error.response && error.response.status === 400) {
        setModalMessage("Email already exists. Please try with another email.");
      } else {
        setModalMessage("Registration failed. Please try again later.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration successful") {
      navigate("/login"); 
    }
  };

  return (
    <Flex
      
      color="black"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={8}
        width="30%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={-10}
      >
        <form onSubmit={handleSubmit}>
          <Box textAlign="center" mb={4}>
            <h1 style={{ fontSize: "40px", fontWeight: "700" }}>Signup</h1>
          </Box>

          <FormControl id="name" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={handleUsername}
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
            />
          </FormControl>

          <FormControl id="pass" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={handlePassword}
            />
          </FormControl>


          <Button type="submit"  width="full">
            Sign Up
          </Button>
        </form>
      </Box>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Status</ModalHeader>
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

export default Signup;