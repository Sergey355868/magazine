import React, {useCallback, useEffect, useState} from 'react';
import { ICreateBrand } from "../modal.interface";
import {OverLay} from "../../OverLay/OverLay";
import {getClassesWithModifires} from "../../../helpers/getClassesWithModifires";
import classes from "./CreateDevice.module.scss";
import {Button} from "../../Button/Button";
import {DropMenu, DropMenuItem} from "../../DropMenu/DropMenu";
import {InputFile} from "../../InputFile/InputFile";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {getAllBrands} from "../../../http/BrandAPI";
import {getAllTypes} from "../../../http/TypeAPI";
import {setBrandEmpty, setBrandError, setSelectedBrand} from "../../../store/Reducers/brandReducer";
import {setSelectedType, setTypeEmpty, setTypeError} from "../../../store/Reducers/typeReducer";
import {BoxError} from "../../BoxError/BoxError";
import {BoxSuccess} from "../../BoxSuccess/BoxSuccess";
import {setDeviceEmpty, setDeviceError} from "../../../store/Reducers/deviceReducer";
import {createDevice} from "../../../http/DeviceAPI";

export const CreateDevice = ({ show = false , onHide }:ICreateBrand) => {
     const dispatch = useAppDispatch();
     let {
         brand:{ brands,selectedBrand,  error:brandError,brand:{ name:brandName } },
         type:{ allTypes,selectedType , error:typeError, type: {name:typeName }},
         device:{error:deviceError,isLoading:deviceLoading,device:{ name:deviceName }},
     } = useTypedSelector(state => state);
     const [name, setName] = useState('');
     const [price, setPrice] = useState(0);
     const [file, setFile] = useState<Blob | null>(null);
     const [info, setInfo] = useState<{title:string;description:string; number:number;}[]>([]);
     let changeNameHandler = useCallback(({ target:{ value }}:React.ChangeEvent<HTMLInputElement>) => {
         setName(value);
     },[]);
     let changePriceHandler = useCallback(({ target:{ value }}:React.ChangeEvent<HTMLInputElement>) => {
         setPrice(Number(value));
     },[]);
     let changeFileHandler = useCallback(({ target:{ files }}:React.ChangeEvent<HTMLInputElement>) => {
        files && setFile(files[0]);
     },[]);
    const addInfo = useCallback( () => {
        setInfo( prevState => [...prevState,{title: '', description: '', number: Date.now()}]);
    },[]);
    const removeInfo = useCallback((number:number) => {
       setInfo(prevState => prevState.filter(( i )=> i.number !== number));
    },[]);
    const changeInfo = useCallback( (key:string, value:string, number:number) => {
      setInfo(prevState => prevState.map((i )=> (i.number === number) ? { ...i, [key] : value } : i));
    },[]);
    const addDevice = useCallback( () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        file && formData.append('img', file);
        formData.append('brandId', String(selectedBrand.id));
        formData.append('typeId', String(selectedType.id));
        formData.append('info', JSON.stringify(info));
        dispatch(createDevice(formData));
    },[name,price,file,selectedBrand,selectedType,info ]);
    useEffect(() => {
        const anHandler = (event:AnimationEvent) => {
            console.log(event);
            if(event.animationName.startsWith( "BoxSuccess_success")) {
                deviceName && dispatch(setDeviceEmpty());
            }
            if(event.animationName.startsWith("BoxError_hidden")) {
                deviceError  &&  dispatch(setDeviceError(""));
            }
        };
        document.addEventListener("animationend",anHandler);
        return () =>  {
            document.removeEventListener("animationend",anHandler);
        };
    },[]);
    useEffect(() => {
       dispatch(getAllBrands());
       dispatch(getAllTypes());
     },[]);
    return show
         ? (
             <>
                 <OverLay animate={ true }></OverLay>
                 <div
                     className= { getClassesWithModifires(classes,"createDevice") }
                 >
                     <div className="createDevice__header">
                         <h3
                           className={ getClassesWithModifires(classes,"createDevice","title") }
                         >Добавить Устройство</h3>
                     </div>
                     <div className={getClassesWithModifires(classes,"createDevice","body")}>
                         {deviceError ? <BoxError message={ deviceError } pos="abs4" animate={true}/> : null }
                         { deviceName ? <BoxSuccess message="Устройство добавлено" pos="abs" shift="shift_2"/> :null }
                         <div className={getClassesWithModifires(classes,"createDevice","block-drop")}>
                             <div
                                 className ={
                                 getClassesWithModifires(classes,"createDevice","drop-type")}
                             >
                                 { typeError ? <BoxError message="Типы не загружены" pos="abs3"/> : null}
                                 <span
                                   className={
                                     getClassesWithModifires(classes,"createDevice","type-text")}
                                 >Тип:</span>
                                 <DropMenu textToggle= { selectedType.name ||"Выбирите тип" }>
                                     {
                                         allTypes.map((type) => {
                                            return <DropMenuItem
                                                   onClick={() => dispatch(setSelectedType(type))}
                                                   key ={type.id}
                                            >
                                                { type.name }
                                            </DropMenuItem>
                                         })
                                     }
                                 </DropMenu>
                             </div>
                             <div className={getClassesWithModifires(classes,"createDevice","drop-brand")}>
                                 { brandError ? <BoxError message="Бренды не загружены" pos="abs3"/> : null }
                                 <span className={
                                     getClassesWithModifires(classes,"createDevice","brand-text")}
                                 >Бренд:</span>
                                 <DropMenu textToggle= { selectedBrand.name || "Выбирите бренд" }>
                                     {
                                         brands.map((brand) => {
                                             return <DropMenuItem
                                                 onClick={() => dispatch(setSelectedBrand(brand))}
                                                 key ={brand.id}
                                             >
                                                 { brand.name }
                                             </DropMenuItem>
                                         })
                                     }
                                 </DropMenu>
                             </div>
                         </div>
                         <div className={
                             getClassesWithModifires(classes,"createDevice","description")}
                         >
                             <div className = {
                                 getClassesWithModifires(classes,"createDevice","description-price")}
                             >
                                 <span className={
                                     getClassesWithModifires(classes,"createDevice","description-text")}
                                 >Название устройства:</span>
                                 <input
                                     value={ name }
                                     onChange={ changeNameHandler }
                                     className={ getClassesWithModifires(classes,"createDevice","input")}
                                     placeholder="Введите название устройства"
                                 />
                             </div>
                             <div className={
                                 getClassesWithModifires(classes,"createDevice","description-name")}
                             >
                                 <span className= {
                                   getClassesWithModifires(classes,"createDevice","description-text")}
                                 >Цена устройства:</span>
                                 <input
                                    value={price}
                                    onChange={ changePriceHandler }
                                    className={ getClassesWithModifires(classes,"createDevice","input")}
                                    placeholder="Введите цену устройства"
                                 />
                             </div>
                             <div className={
                                 getClassesWithModifires(classes,"createDevice","description-photo")}
                             >
                                 <span className={
                                     getClassesWithModifires(classes,"createDevice","description-text")}
                                 >Добавить фото:</span>
                                 <InputFile
                                  onChange={ changeFileHandler }
                                 />
                             </div>
                         </div>

                         <div className = {
                             getClassesWithModifires(classes,"createDevice","info")}
                         >
                             <div className = {
                                 getClassesWithModifires(classes,"createDevice","add")}
                             >
                                 <Button
                                     theme="2"
                                     className={
                                     getClassesWithModifires(classes,"createDevice","add-button")
                                    }
                                     onClick={addInfo}
                                 >
                                     Добавить новое свойство
                                 </Button>
                             </div>
                             <div className={
                                 getClassesWithModifires(classes,"createDevice","properties")}
                             >
                                { info.map( i =>
                                    <div className={
                                        getClassesWithModifires(classes,"createDevice","row")}
                                         key={ i.number }
                                    >
                                        <div className={
                                            getClassesWithModifires(classes,"createDevice","col")}
                                        >
                                          <input
                                            className={
                                            getClassesWithModifires(classes,"createDevice","input")}
                                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                            placeholder="Введите название свойства"
                                          />
                                        </div>
                                        <div className= {
                                            getClassesWithModifires(classes,"createDevice","col")}
                                        >
                                          <textarea
                                             className={
                                             getClassesWithModifires(classes,"createDevice","textarea")}
                                             onChange={(e) => changeInfo('description',e.target.value, i.number)}
                                             placeholder="Введите описание свойства"
                                          />
                                        </div>
                                        <div className={
                                            getClassesWithModifires(classes,"createDevice","col")
                                            }
                                        >
                                            <Button
                                              theme="2"
                                              className={
                                               getClassesWithModifires(classes,"createDevice","delete")
                                              }
                                              onClick={() => removeInfo(i.number)}
                                            > Удалить</Button>
                                        </div>
                                    </div>
                                )}
                             </div>
                         </div>
                     </div>
                     <div className={ getClassesWithModifires(classes,"createDevice","footer") }>
                         <Button className= {
                             getClassesWithModifires(classes,"createDevice","add-serv")}
                                 onClick={ addDevice }
                         >
                             Добавить
                          { deviceLoading ?<span className={getClassesWithModifires(classes,"spiner")}></span> : null}
                         </Button>
                         <Button
                             className ={getClassesWithModifires(classes,"createDevice","close")}
                             onClick={ onHide }
                         > Закрыть  </Button>
                     </div>
                 </div>
             </>
         )
   : null;
 };


