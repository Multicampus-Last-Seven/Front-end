import React from "react";
import * as mqtt from "react-paho-mqtt";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import NoIoT from "./NoIoT";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  titleBar: {
    position: "absolute",
    top: "0",
  },
}));

const firepop = (src) => {
  let img = new Image();
  img.src = src;
  const OpenWindow = window.open(
    "",
    "FIRE WARNNING",
    "width=" +
      720 +
      ", height=" +
      720 +
      ", left=" +
      40 +
      ", right=" +
      40 +
      ", menubars=no, scrollbars=auto"
  );
  OpenWindow.document.write(
    "<style>body{margin:0px;}</style><img src='" +
      src +
      "' width='" +
      640 +
      "'>"
  );
};

const onIconButtonClick = () => {
  window.open()
}

function Monitor(props) {
  //MQTTconnect();
  const [client, setClient] = React.useState(null);
  const _topic = ["mydata/stream/#"];
  const _options = {};
  const classes = useStyles();

  React.useEffect(() => {
    _init();
  }, []);

  React.useEffect(() => {
    if (client !== null) _onSubscribe();
  }, [client]);

  const _init = () => {
    const c = mqtt.connect(
      "yourIP",
      Number(9001),
      "mqtt",
      _onConnectionLost,
      _onMessageArrived
    ); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  };

  // called when sending payload
  const _sendPayload = () => {
    const payload = mqtt.parsePayload("Hello", "World"); // topic, payload
    client.send(payload);
  };

  // called when client lost connection
  const _onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  };

  // called when messages arrived
  const _onMessageArrived = (msg) => {
    if (props.iots.length === 0) return;
    props.iots.forEach((element) => {
      if (
        msg.destinationName ===
        `mydata/stream/camera/${element["serialNumber"]}`
      ) {
        document.getElementById(`${element["serialNumber"]}`).src =
          "data:image/jpeg;base64," +
          btoa(String.fromCharCode.apply(null, msg.payloadBytes));
      }
      else if (msg.destinationName === `mydata/stream/alarm/${element["serialNumber"]}`) {
        alert(`${element["location"]}에서 화 재 발 생`);
        let src = "data:image/jpeg;base64,"+btoa(String.fromCharCode.apply(null, msg.payloadBytes));
        firepop(src);
    }
    });

    /*
        else if (msg.destinationName === "mydata/stream/sensor") {
            let sensor = msg.payloadString;
            document.getElementById("sensor1").textContent = "센서값 : " + sensor;
            //document.write("센서값 : "+sensor);
        }
        */
  };

  // called when subscribing topic(s)
  const _onSubscribe = () => {
    client.connect({
      onSuccess: () => {
        for (var i = 0; i < _topic.length; i++) {
          client.subscribe(_topic[i], _options);
        }
      },
    }); // called when the client connects
  };

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  };

  // called when disconnecting the client
  const _onDisconnect = () => {
    client.disconnect();
  };

  let height = 0;
  if (props.iots.length <= 2) height = window.innerHeight;
  else height = window.innerHeight / (props.iots.length / 3);
  console.log(height);

  return (
    <div className={classes.root}>
      {props.iots.length === 0 ? (
        <NoIoT />
      ) : (
        <GridList cellHeight={height} className={classes.gridList} cols={3}>
          {props.iots.map((iot) => (
            <GridListTile key={iot.serialNumber}>
              <img id={iot.serialNumber} src="" alt="" height={height}/>
              <GridListTileBar
                title={iot.location}
                /*subtitle={iot.co}*/
                actionIcon={
                  <IconButton
                    aria-label={`info about ${iot.title}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
}

export default Monitor;
