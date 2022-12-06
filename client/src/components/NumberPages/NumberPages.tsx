import React from 'react';
import {Pagination, PaginationItem} from "../Pagination/Pagination";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setActivePage} from "../../store/Reducers/deviceReducer";

export const NumberPages = () => {
    const dispatch = useAppDispatch();
    let {device:{ totalCount,activePage,limit }} = useTypedSelector(state => state);
    const pageCount = Math.ceil(totalCount / limit);
    return (
        <Pagination>
             {
               pageCount > 1 ? new Array(pageCount).fill("").map((_,index) => {
                    return <PaginationItem
                        key={index}
                        active={ index + 1 === activePage }
                        onClick={() => { dispatch(setActivePage(index + 1))}}
                    >
                        { index + 1 }
                    </PaginationItem>
                })
               : null
             }
        </Pagination>
    );
};

