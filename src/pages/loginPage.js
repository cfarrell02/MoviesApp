import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../style.css";
import { auth } from "../firebase-config";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import img from '../images/pexels-dziana-hasanbekava-5480827.jpg';

function LoginPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  }
  )


  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (

    <Grid container display="flex"
    justifyContent="center"
    alignItems="center">
      {user ? (
      <Grid item xs={12} display="flex"
    justifyContent="center"
    alignItems="center"
    style = {{paddingTop:20}}>
        <Card sx={{ width: 800 }}>
          <CardHeader title={`${user.email} is logged in!`} style = {{textAlign:'center'}} />
          <CardActions style={{justifyContent: 'center'}}>
            <Button onClick={logout}>Logout</Button>
            </CardActions>
            </Card>
        </Grid>
      ) : (<>
            <Grid item xs={12} display="flex"
    justifyContent="center"
    alignItems="center"
    style = {{paddingTop:20}}>
        <Card sx={{ width: 800 }}>
          <CardHeader title="Welcome to the TMDB Client" style = {{textAlign:'center'}} />
          <CardContent>
            <Typography variant="body2" color="text.secondary" style = {{textAlign:'center'}}>
              Please login or register to continue
            </Typography>
          </CardContent>
            </Card>
        </Grid>
      <Grid item xs={6} display="flex"
    justifyContent="right"
    alignItems="center"
    style = {{paddingRight: 20, paddingTop:50}}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader title="Register User" style = {{textAlign:'center'}}/>
        {/* <Typography variant='h3'> Register User </Typography> */}
        <Grid container display="flex" justifyContent="center" alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <TextField
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          style = {{padding: 10}}
        />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <TextField
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          style = {{padding: 10}}
        />
        </Grid>
        </Grid>
          <CardActions style={{justifyContent: 'center'}}>
        <Button onClick={register}> Create User</Button>
        </CardActions>
        </Card>
      </Grid>

      <Grid item xs={6} display="flex"
    justifyContent="left"
    alignItems="center"
    style = {{paddingLeft: 20, paddingTop:50}}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader title="Login" style = {{textAlign:'center'}}/>
        {/* <Typography variant='h3'> Register User </Typography> */}
        <Grid container display="flex" justifyContent="center" alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <TextField
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          style = {{padding: 10}}
        />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <TextField
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          style = {{padding: 10}}
        />
        </Grid>
        </Grid>
          <CardActions style={{justifyContent: 'center'}}>
        <Button onClick={login}>Login</Button>
        </CardActions>
        </Card>
      </Grid>
      </>)}

      </Grid>
 
  );
}

export default LoginPage;