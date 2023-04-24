import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';

const configuration = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] };

const VideoCallScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const localStreamRef = useRef();
  const remoteStreamRef = useRef();

  useEffect(() => {
    // request access to camera and microphone
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        // display local stream in UI and save reference
        localStreamRef.current = stream;
        setLocalStream(stream);
      })
      .catch(error => console.log(error));
  }, []);

  const startCall = () => {
    // create peer connection
    const connection = new RTCPeerConnection(configuration);

    // add event handlers for ICE candidate and remote stream
    connection.onicecandidate = handleIceCandidate;
    connection.onaddstream = handleRemoteStream;

    // add local stream to peer connection
    connection.addStream(localStreamRef.current);

    // create offer to start peer connection
    connection.createOffer()
      .then(offer => {
        // set local description and send offer to remote peer
        return connection.setLocalDescription(new RTCSessionDescription(offer));
      })
      .then(() => {
        // send offer to remote peer via signaling server
        sendOfferToServer(connection.localDescription);
      })
      .catch(error => console.log(error));

    // save peer connection to state
    setPeerConnection(connection);
  };

  const handleIceCandidate = event => {
    if (event.candidate) {
      // send ICE candidate to remote peer via signaling server
      sendIceCandidateToServer(event.candidate);
    }
  };

  const handleRemoteStream = event => {
    // display remote stream in UI and save reference
    remoteStreamRef.current = event.stream;
    setRemoteStream(event.stream);
  };

  const hangUp = () => {
    // close peer connection and reset state
    peerConnection.close();
    setIsConnected(false);
    setLocalStream(null);
    setRemoteStream(null);
    setPeerConnection(null);
  };

  return (
    <View style={styles.container}>
      {!isConnected && <Button title="Start Call" onPress={startCall} />}
      {isConnected && <Button title="Hang Up" onPress={hangUp} />}
      {localStream && <RTCView streamURL={localStream.toURL()} style={styles.localStream} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.remoteStream} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  localStream: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  remoteStream: {
    width: '100%',
    height: '100%',
  },
});

export default VideoCallScreen;
