import React, {useCallback, useEffect, useMemo, useState} from 'react';
import close from "../../assets/close.png";
import entry from "../../assets/entry.jpg";
import "./entry_form.scss"
import { Button } from "../Button/Button";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../routes/routesPathes";
import {Link, useLocation, useNavigate } from "react-router-dom";
import {OverLay} from "../OverLay/OverLay";
import {login, registration} from "../../http/UserAPI";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {BoxError} from "../BoxError/BoxError";
import {setError} from "../../store/Reducers/userReducer";

export const EntryForm = () => {
    const location = useLocation();
    const navigate= useNavigate();
    const dispatch = useAppDispatch();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let { user: { isLoading, error } } = useTypedSelector(state => state);
    let handlerSubmit = useCallback((event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    },[]);
    let passwordHandler = useCallback(({ target:{ value } }:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    },[]);
    let emailHandler = useCallback(({ target:{ value } }:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(value);
    },[]);
    let closeHandler = useCallback(() => {
        navigate(SHOP_ROUTE);
    },[navigate]);
    let linkClickHandler = useCallback((event:React.MouseEvent) => {
       if(isLoading) {
           event.preventDefault();
       }
       error && dispatch(setError(""));
       setEmail("");
       setPassword("");
    },[error,isLoading]);
    useEffect(() => {
        return () => {
          error && dispatch(setError(""));
        }
    },[]);
    let clickHandler = useCallback( (event?:React.MouseEvent) => {
        if(email && password) {
          if(isLogin) {
            dispatch(login(email, password));
          } else {
            dispatch(registration(email, password));
          }
          setEmail("");
          setPassword('');
       }
    },[email,password,isLogin]);
    let withoutAn = useMemo(() =>[
        "entry-form__container-img",
        "entry-form__container-img_shadow",
        "entry-form__container-img_border",
    ].join(" "),[]);
    let withAn = useMemo(() =>[
        "entry-form__container-img",
        "entry-form__container-img_shadow",
        "entry-form__container-img_border",
        "entry-form__container-img_animation",
    ].join(" "),[]);
     return (
        <>
            <OverLay animate={ true }/>
            <div  className="entry-form entry-form_border1  entry-form_shadow1 entry-form_theme2 root__entry-form
                  entry-form_size entry-form_animate"
            >
                <form name="entry-form"  autoComplete="off" onSubmit={ handlerSubmit } className="entry-form__form" >
                    { error ? <BoxError message={ error } pos={"abs1"} />  : null }
                    <span className={isLoading ? "entry-form__close entry-form__close_none" : "entry-form__close"}
                          onClick={ closeHandler }
                    >
                        <img src={ close }  alt="закрыть" className ="entry-form__close-img entry-form__close-img_shadow
                          entry-form__close-img_size entry-form__close-img_border"
                        />
                    </span>
                    <div className= {isLoading ? withAn : withoutAn }>
                        <img src={ entry }  alt="фото" className="entry-form__img entry-form__img_size
                          entry-form__img_border"
                        />
                   </div>
                   <label htmlFor="name" className="entry-form__label entry-form__label_style">Введите ваш Email</label>
                   <input
                        value={ email }
                        onChange ={ emailHandler }
                        type="text"
                        id="name"
                        className="entry-form__input-text entry-form__input-text_style entry-form__input-text_size
                        entry-form__input-text_outline entry-form__input-text_border entry-form__label_style
                        entry-form__input-text_shadow entry-form__input-text_outline"
                   />
                   <label htmlFor="password" className="entry-form__label entry-form__label_style">Пароль</label>
                    <input
                        value={ password }
                        onChange={ passwordHandler }
                        type="password"
                        id="password"
                        className="entry-form__input-text entry-form__input-text_style entry-form__input-password_style
                        entry-form__input-text_size entry-form__input-text_outline entry-form__input-text_border
                        entry-form__label_style entry-form__input-text_shadow"
                    />
                    <div className="row-entryform row-entryform_pb">
                        <span className="entry-form__row">
                            <Button  className ="entry-form__button entry-form__button_shadow entry-form__button_border
                                entry-form__button_theme entry-form__input-text_outline entry-form__close-img_cursor"
                                disabled={ isLoading }
                                onClick={ clickHandler }
                            >
                                { isLogin  ? 'Войти' : 'Регистрация'}
                            </Button>
                        </span>
                        <span className="entry-form__forget">
                                <span className= "entry-form__row entry-form__row_style">
                                      { isLogin ? "Нет аккаунта?" : "Есть аккаунт?" }
                                </span>
                                <span className="entry-form__row entry-form__row_mt ">
                                    <Link
                                       className="entry-form__link entry-form__link_style entry-form__link_border"
                                       to={  isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE }
                                       onClick={ linkClickHandler }
                                    >
                                        { isLogin ?"Зарегистрируйся!" :"Войдите!"}
                                    </Link>
                                </span>
                       </span>
                    </div>
               </form>
            </div>
        </>
    );
};

