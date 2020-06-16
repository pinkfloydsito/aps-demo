import React, { useState, useCallback, useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'

import ImageGrid from './ImageGrid';

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
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename,
      mimetype, 
      encoding
    }
  }
`;

const PaperDropzone = () => {
  const [saved, setSaved] = useState(false);

  const {
    getRootProps, getInputProps,
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      mutate({ variables: { file: acceptedFiles[0] } }).then((response) => {
        setSaved(true);
      });
    }
  })
  const {ref, ...rootProps} = getRootProps()
  const [mutate] = useMutation(MUTATION);
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return(
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={8}>
            <RootRef rootRef={ref}>
              <Paper {...rootProps} className={classes.paper}>
                <input {...getInputProps()} type="file" />
                <p>Escoja su imagen</p>
              </Paper>
            </RootRef>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ImageGrid
            saved={saved}
            setSaved={setSaved}
          />
        </Grid>
      </Grid>
 </Grid>
  );
}

export default PaperDropzone;
