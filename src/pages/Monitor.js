import React from 'react'
import * as mqtt from 'react-paho-mqtt';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import iots from '../Dummy';
import { GridListTileBar, IconButton, ListSubheader } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  titleBar:{
    position: "absolute",
    top: "0"
  }
}));

function Monitor() {
    //MQTTconnect();
    const [ client, setClient ] = React.useState(null);
    const _topic = ["mydata/stream/#"];
    const _options = {
    };
    const classes = useStyles();
  
    React.useEffect(() => {
      _init();
    },[])

    React.useEffect(() => {
        if(client !== null) _onSubscribe()
    },[client])
  
    const _init = () => {
      const c = mqtt.connect("15.165.185.201", Number(9001), "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
      setClient(c);
    }
  
    // called when sending payload
    const _sendPayload = () => {
      const payload = mqtt.parsePayload("Hello", "World"); // topic, payload
      client.send(payload);
    }
  
    // called when client lost connection
    const _onConnectionLost = responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
      }
    }
  
    // called when messages arrived
    const _onMessageArrived = msg => {
        if (msg.destinationName === "mydata/stream/camera") {
            document.getElementById("streaming").src = "data:image/jpeg;base64," + btoa(String.fromCharCode.apply(null, msg.payloadBytes));
        } else if (msg.destinationName === "mydata/stream/sensor") {
            let sensor = msg.payloadString;
            document.getElementById("sensor1").textContent = "센서값 : " + sensor;
            //document.write("센서값 : "+sensor);
        }
    }
  
  
    // called when subscribing topic(s)
    const _onSubscribe = () => {
      console.log(client);
      client.connect({ onSuccess: () => {
        for (var i = 0; i < _topic.length; i++) {
          client.subscribe(_topic[i], _options);
        }}
      }); // called when the client connects
    }
  
    // called when subscribing topic(s)
    const _onUnsubscribe = () => {
      for (var i = 0; i < _topic.length; i++) {
        client.unsubscribe(_topic[i], _options);
      }
    }
  
    // called when disconnecting the client
    const _onDisconnect = () => {
      client.disconnect();
    }

    let height = 0;
    if(iots.length <= 2) height = window.innerHeight;
    else height = window.innerHeight / (iots.length / 3);

    return (
      <div className={classes.root}>
      <GridList cellHeight={height} className={classes.gridList} cols={3}>
        {iots.map((iot) => (
          <GridListTile key={iot.img}>
            <img src={iot.img} alt={iot.title} />
            <GridListTileBar
              title={iot.title}
              subtitle={iot.co}
              actionIcon={
                <IconButton aria-label={`info about ${iot.title}`} className={classes.icon}>
                  <InfoIcon />                  
                </IconButton>
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>  
    )
    {/*  
        <div>
            <img id="streaming" src="" alt=""/>
            <h2 id="sensor1">Text test</h2>
      </div>*/}
}

export default Monitor
