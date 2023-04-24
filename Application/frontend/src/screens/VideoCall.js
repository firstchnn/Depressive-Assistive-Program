import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import {useNavigation} from '@react-navigation/native';
import {MediaStream} from 'react-native-webrtc';
import UserChatScreen from './UserChatScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

function VideoCall() {
  const nav = useNavigation();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  // const [localStream, setLocalStream] = useState<MediaStream | null>()
  // const [remoteStream, setRemoteStream] = useState<MediaStream | null>()
  const [isCalling, setIsCalling] = useState(false);
  // const pc  = useRef<RTCPeerConnection>();

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
    // nav.navigate('MainChat');
    nav.goBack();
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
            <TouchableOpacity style={styles.HangUpBTN} onPress={handleHangUp}>
              <Image
                source={require('../asset/Phone.png')}
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  position: 'absolute',
                  top: 10,
                  bottom: 0,
                  left: 10,
                  right: 0,
                  margin: 'auto',
                  width: 40,
                  height: 40,
                }}></Image>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'red',
    borderWidth:0,
  },
  HangUpBTN: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    backgroundColor: '#ea2a2a',
    borderRadius: 100,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth:0,
  },
  videoContainer: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderWidth: 0,
  },
  button: {
    padding: 10,
    borderWidth:0
  },
});


export default VideoCall;
