import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native';

const VideoCallScreen = () => {
    const [videoCall, setVideoCall] = useState(true);
    const connectionData = {
        appId: 'f15549e166fe4cdfbe5dacfd143dab1e',
        channel: 'DPA',
        token: '007eJxTYFCZN+2ErpnJduPoBwvKH97LW9HlWnQvc+sank3L2c8JRjkrMKQZmpqaWKYampmlpZokp6QlpZqmJCanpRiaGKckJhmmXrL0SGkIZGSov6/OyMgAgSA+M4NLgCMDAwBV0h92',
    };
    const rtcCallbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    ) : (
        <Text onPress={() => setVideoCall(true)}>Start Call</Text>
    );

}

export default VideoCallScreen;