import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import {useNavigation} from '@react-navigation/native';

function VideoCall(){
  const nav = useNavigation();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);
    setIsCalling(true);
  };

  useEffect(() => {
    startLocalStream();
  }, []);

  const handleHangUp = () => {
    setIsCalling(false);
    localStream?.getTracks().forEach(track => track.stop());
    remoteStream?.getTracks().forEach(track => track.stop());
    nav.navigate('MainChat');
  };

  return (
    <View style={styles.container}>
      {remoteStream && (
        <RTCView
          style={styles.rtcView}
          streamURL={remoteStream.toURL()}
          mirror={false}
          objectFit={'cover'}
        />
      )}
      <View>
      <Text>Calling...</Text>
      </View>
      {localStream && (
        <View style={styles.localView}>
          <RTCView
            style={styles.rtcViewLocal}
            streamURL={localStream.toURL()}
            mirror={true}
            objectFit={'cover'}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        {isCalling && (
          <View style={styles.button}>
            <Button title="Hang Up" onPress={handleHangUp} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtcView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  rtcViewLocal: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    zIndex: 1,
  },
  localView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 150,
    zIndex: 1,
  },
  localVideo: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideoInner: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // borderWidth:5,
    bottom: 0,

  },
  videoContainer: {
    width: 10,
    height: 10,
    backgroundColor:'red',
    borderWidth:5,
  },
  button: {
    padding: 10,
    bottom: 0,
  },
});

export default VideoCall;
