import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../routes/routesPathes";
import {EntryForm} from "../components/EntryForm/EntryForm";

export const Auth = () => {
    return (
        <>
          <EntryForm/>
        </>
    );
};

