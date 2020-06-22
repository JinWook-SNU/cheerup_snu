import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Api from '../../Api/Api'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Cheer Up SNU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
	},
	defaultAddress: {
		marginTop: 10,
		fontSize: 20,
	},
}));

export default function Register() {
	const classes = useStyles();
	const api = new Api();

	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');


	const signUp = async (name, email, password) => {
		const fullEmail = email+'@snu.ac.kr'
		api.signUpWithEmail('wlsdnr330@snu.ac.kr','123123')
		alert(fullEmail)

		api.signUpWithEmail(fullEmail, password).then(()=>{
			api.signInWithEmail(fullEmail, password);
		}).then(()=>{
			api.changeUserName(name);
		}).then(()=>{
			api.sendEmailVerification();
		}).then(()=>{
			api.getUserStatus();
		})
	}



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
								autoFocus
								value={userName}
								onChange={e => setUserName(e.target.value)}
              />
            </Grid>
							<Grid item xs={8}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={userEmail}
									onChange={e => setUserEmail(e.target.value)}
								/>
							</Grid>
							<Grid className={classes.defaultAddress} item xs={4}>
								@snu.ac.kr
							</Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
								autoComplete="current-password"
								value={userPassword}
								onChange={e => setUserPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
						className={classes.submit}
						// onClick = {()=> {api.signUpWithEmail('wlsdnr330@snu.ac.kr','123123')}}
						onClick = {()=>{ 
							api.signUpWithEmail('wlsdnr330@snu.ac.kr','password');
						}}
						// onClick = {()=> {signUp(userName, userEmail, userPassword)}}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
