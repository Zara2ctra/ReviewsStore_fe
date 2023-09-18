import React, {useContext} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const {user} = useContext(Context);
    const {id} = useParams();


    return (
        <div>
            
        </div>
    );
};

export default UserPage;