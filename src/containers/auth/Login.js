import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Api from '../../Api/Api'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({history}) {
  const api = new Api();
	const classes = useStyles();
	const [userName, setUserName] = useState(false);
	const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  const validationCheck = async() => {
    await api.loadEmailVerification().then((res) => {
      res.map((res)=>{
        console.log(res)
        if(res.Email===userEmail) localStorage.setItem('verified', true)
      })
    })
  }

	const signInWithEmail = async (email, password) => {
    setDisabledInput(true);
    await api.signInWithEmail(email, password).then(()=>{
      setTimeout(()=>{
        if(localStorage.getItem('userEmail')) {
          history.push('/');
          validationCheck();
          api.getUserStatus();
        }else{
          setDisabledInput(true);
          alert('서버통신 시간을 초과하였습니다. 다시 시도해주세요.')
        }
      },2500);
    })
		
		// await api.getUserStatus().then((res)=>{
		// 	setUserName(res);
		// })
		// console.log(isLogin);
		// if (isLogin) {
		// 	return (<Redirect to='/' />)
		// } else {
		// 	alert('로그인 실패')
		// }
	}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            disabled={disabledInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
						autoFocus
						value={userEmail}
						onChange={e => setUserEmail(e.target.value)}
          />
          <TextField
            disabled={disabledInput}
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={disabledInput}
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
						className={classes.submit}
						onClick={()=>{
							signInWithEmail(userEmail, userPassword);
						}}
          >
            Sign In
          </Button>
					<button onClick={()=>{console.log(userEmail, userPassword)}}>check</button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link className="auth-button" to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}