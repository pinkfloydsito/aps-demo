import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
  STATIC_URL
} from '../utils/variables';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    justifyContent: 'center',
    transform: 'translateZ(0)',
    padding: '30px'
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
  },
}));

const GET_PICTURES = gql`
  {
     uploads {
      filename,
      mimetype,
    }
  }
`;
export default function ImageGrid({ saved, setSaved }) {

  const [images, setImages] = useState([]);
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_PICTURES);

  useEffect(() => {
    setImages(( data && data.uploads ) || []);
  }, [data]);

  useEffect(() => {
    if(saved === true) {
      refetch();
      setSaved(false);
    }
  }, [saved]);


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}
                spacing={15} cellHeight={400}
                cols={2.5}>
        {images.map((tile, i) => (
          <GridListTile key={i}>
            <img src={`${STATIC_URL}${tile.filename}`} alt={tile.filename} />
            <GridListTileBar
              title={tile.filename}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
