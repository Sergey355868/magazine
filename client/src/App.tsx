import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import { AppRouters } from "./routes/AppRouters";
import {NavBar} from "./components/NavBar/NavBar";
import {Loader} from "./components/Loader/Loader";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {BoxError} from "./components/BoxError/BoxError";
import {check} from "./http/UserAPI";

function App() {
    console.log("Appppppppppppppppppppppp");
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [error,   setIsError] = useState("");
    useEffect(() => {
      console.log("App");
      dispatch(check(setLoading,setIsError));
    },[]);
    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <BoxError message={ error } pos="fix"/>
    }
  return (
        <BrowserRouter>
             <NavBar/>
            <AppRouters/>
        </BrowserRouter>
  );
}
export default App;
