import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  EmailAuthProvider
} from "firebase/auth";
import { addNewFavourites, addNewMustWatch, addNewReviews } from "../api/firebase-api";
import "../style.css";
import { auth, signInWithGoogle } from "../firebase-config";
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
import Alert from '@mui/material/Alert'
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";


function LoginPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error,setError] = useState("");

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
      await addNewFavourites(registerEmail);
      await addNewMustWatch(registerEmail);
      await addNewReviews(registerEmail);
      console.log(user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const login = async () => {
    console.log(process.env.FIREBASE_API_KEY);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const deleteCurrentUser = async (password) => {
    try{
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      )
    
      const result = await reauthenticateWithPopup(
        auth.currentUser,
        credential
      )
    
      // Pass result.user here
      await deleteUser(result.user)
    console.log(`User ${user.email} deleted`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const displayName = user? (user.displayName ? user.displayName: user.email): null;

  return (

    <Grid container display="flex"
    justifyContent="center"
    alignItems="center">
      {user ? (<>
      <Grid item xs={12} display="flex"
    justifyContent="center"
    alignItems="center"
    style = {{paddingTop:20}}>
        <Card sx={{ width: 800 }}>
          <CardHeader title={`${displayName} is logged in!`} style = {{textAlign:'center'}} />
          <CardActions style={{justifyContent: 'center'}}>
            <Button onClick={logout}>Logout</Button>
            {/* <Button onClick={deleteCurrentUser}>Delete this account</Button> */}
            </CardActions>
            </Card>
        </Grid>
              <Grid item xs={12} display="flex"
              justifyContent="center"
              alignItems="center"
              style = {{paddingTop:50}}>
                <Card sx={{width:1000}}>
                <CardHeader title={`Hello ${displayName}, here are some quick links.`} style = {{textAlign:'center'}} />
          <CardActions style={{justifyContent: 'center'}}>
            <Link to="/movies/favourites" style={{ textDecoration: "none" }} ><Button>Favourite Movies</Button></Link>
            <Link to="/tvshows/favourites" style={{ textDecoration: "none" }} ><Button>Favourite Shows</Button></Link>
            </CardActions>
                </Card>
                </Grid>
        
                </> ) : (<>
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
        type = 'password'
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
          type = 'password'
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
      <Grid item xs={12} display="flex"
    justifyContent="center"
    alignItems="center"
    style = {{paddingTop:20}}>
        {/* <Card sx={{ maxWidth:400 }}>
          <CardHeader title="Login With Google" style = {{textAlign:'center'}} />
          <CardActions style={{justifyContent: 'center'}}>
          <Button onClick={signInWithGoogle}><Card sx ={{width:50}}><GoogleIcon/></Card></Button>
            </CardActions>
            </Card> */}
        </Grid>
        <Grid item xs={12} display="flex"
    justifyContent="center"
    alignItems="center"
    style = {{paddingTop:20}}>
      {error ?
            <Alert severity="error">{error}</Alert> : null}
      </Grid>
      </>)}

      </Grid>
 
  );
}

export default LoginPage;