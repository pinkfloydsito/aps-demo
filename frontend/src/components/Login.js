import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import * as authDuck from "../redux/ducks/auth.duck";
import { withRouter } from "react-router";
const { useMutation } = require('@apollo/react-hooks');
const gql = require('graphql-tag');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '20px'
  },
  paper: {
    textAlign: 'center',
    height: '200px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const MUTATION = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}`;


const Login = ({
  history
}) => {
  const classes = useStyles();

  const [mutate] = useMutation(MUTATION);
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value)
            }}
          />
      </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value)
            }}
          />
      </Grid>

        <Grid item xs={12}>
          <Button type="primary" onClick={(evt) => {
            evt.preventDefault();

            mutate({ variables: { email, password } }).then((response) => {
              const {
                data
              } = response;

              dispatch(authDuck.actions.login( { token: data.login }));
      });
          }}> Login </Button>
      </Grid>
    </Grid>
        </form>
  );
}

export default withRouter(Login);
