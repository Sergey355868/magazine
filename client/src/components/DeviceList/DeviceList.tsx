import React from 'react';
import {DeviceItem} from "../DeviceItem/DeviceItem";
import {useTypedSelector} from "../../hooks/useTypedSelector";

 export const DeviceList = () => {
    let {device:{ allDevicies }} = useTypedSelector(state => state)
    return (
        <>
            {
                allDevicies.map((device,index,arr) => {
                    if(index === arr.length - 1   && arr.length % 2 !== 0 ) {
                        return [
                            <DeviceItem key={device.id} device={device}/>,
                            <DeviceItem fake={true} key={device.id +"fake"} device={device}/>];
                    } else {
                      return  <DeviceItem
                                key={device.id}
                                device = {device}
                      />;
                    }
                })
            }
       </>
    );
};

