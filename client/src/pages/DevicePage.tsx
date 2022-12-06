import React, {useEffect} from 'react';
import telephone from "../assets/telephone.jpg";
import bigStar  from "../assets/bigStar.png";
import {Button} from "../components/Button/Button";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {getOneDevice} from "../http/DeviceAPI";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {baseUrl} from "../http";

export const DevicePage = () => {
    let { device:{ device } } = useTypedSelector(state => state);
    const  dispatch = useAppDispatch();
    let { id } = useParams();
    useEffect(() => {
       id  && dispatch(getOneDevice(id));
    },[]);
    return (
        <div className="contaner" style={{marginTop:"65px"}}>
            <div className="row">
                <div className="col col_size_33">
                    <img src={ baseUrl.toString() + device.img } alt="картинка" width={300} height={300} />
                </div>
                <div className="col col_size_33">
                    <div className="col">
                        <h2>{ device.name }</h2>
                    </div>
                    <div style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}>
                        { device.rating }
                    </div>
                </div>
                <div className="col col_size_33">
                    <div className="col">
                        <h3>{ device.price } руб.</h3>
                        <Button theme="2">Добавить в корзину</Button>
                    </div>
                </div>
            </div>
            <div className="col">
                <h2>Харрактеристики</h2>
                 {
                    device.info?.map((info, index) => {
                       return <div
                            style={{
                                width:"100%",
                                textAlign:"center",
                                background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: "10px"
                            }}
                            key={ info.id }
                       >
                         { info.title } : { info.description }
                       </div>
                    })
                }
            </div>
        </div>
    );
};

