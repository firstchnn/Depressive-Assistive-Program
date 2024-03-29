import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native';

const VideoCallScreen = ({navigation, route}) => {
    const [videoCall, setVideoCall] = useState(true);
    const connectionData = {
        appId: 'f15549e166fe4cdfbe5dacfd143dab1e',
        // channel: `${route.params.userEmail}${route.params.doctorName}`,
        channel : 'DPA',
        token: '007eJxTYFCZN+2ErpnJduPoBwvKH97LW9HlWnQvc+sank3L2c8JRjkrMKQZmpqaWKYampmlpZokp6QlpZqmJCanpRiaGKckJhmmXrL0SGkIZGSov6/OyMgAgSA+M4NLgCMDAwBV0h92',
        userId: `${route.params.doctorName}${route.params.userEmail}`,
    };
    const handleEnd = async () => {
        await setVideoCall(false);
        await navigation.goBack();
    }
    const rtcCallbacks = {
        EndCall: () => handleEnd(),
    };
    return (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    )

}

export default VideoCallScreen;