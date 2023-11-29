import React from 'react';
import DeckStep from "./DeckStep";

export const DeckCreator = () => {
    return ( <DeckStep onSuccess={()=>{alert('success')}}/>);
};