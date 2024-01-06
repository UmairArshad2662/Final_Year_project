import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
const Video=()=>{
    const navigation = useNavigate()
   const {roomId}= useParams();
   const myMeeting = async(element)=>{
        const appID=633574641;
        const serverSecret ="2472e247bf890ed30ae2f08b9d79e3d3";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId, Date.now().toString(),"Umair");
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
            turnOnCameraWhenJoining:false,
            onLeaveRoom: () => {
                navigation("/")
            }

        });
   }
    return <div ><div ref={myMeeting}/></div>

    
}
export default Video;