import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function NoIoT() {

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom style={{marginTop:"50px"}}>
          No CCTV Detected.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'현재 등록된 CCTV가 존재하지 않습니다.'}
        </Typography>
      </Container>
    </>
  );
}

export default NoIoT;