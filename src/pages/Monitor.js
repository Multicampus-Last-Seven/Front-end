import React from 'react'
import * as mqtt from 'react-paho-mqtt';

function Monitor() {
    //MQTTconnect();
    const [ client, setClient ] = React.useState(null);
    const _topic = ["mydata/stream/#"];
    const _options = {
    };
  
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

    return (       
        <div>
            <img id="streaming" src="" alt=""/>
            <h2 id="sensor1">Text test</h2>
        </div>
    )
}

export default Monitor
