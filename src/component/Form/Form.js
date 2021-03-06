import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { connect, useSelector } from 'react-redux'

import { updateItem, fetchItem } from '../../redux/actions/apiActions';
import { EditItemPageStyles } from '../../styles/Pages.styles';

import Button from '../../styles/Buttons.styles';
import Field from '../../styles/FormField';

const Form = ({ loading, updateItem, fetchItem, error, ok }) => {

    const { id } = useParams();
    const activeItem = useSelector(store => store.apiState.activeItem);

    const [item, setItem] = useState(activeItem);
    const [hasChanged, formHasChanged]= useState(false);

    useEffect(()=>{
        fetchItem({id});
    },[ id, fetchItem])

    const handleInputChange = (event) => {
        formHasChanged(true)
        setItem({
            ...activeItem,
            [event.target.name] : event.target.value
        })
    }

    const requestUpdate = (event) => {
        event.preventDefault()
        if (hasChanged) updateItem({...item});
    }

    return (
        <EditItemPageStyles>
            {
            loading
            ? <p>LOADING</p>
            : (
                activeItem
                ? <form onSubmit={requestUpdate}>
                    <legend>Edit {activeItem.name}</legend>
                    <img src={activeItem.imageUrl} alt={`${ activeItem.name} card`} />
                    <Field
                        type="text"
                        onChange={handleInputChange}
                        defaultValue={activeItem.name}
                        required
                        name="name"
                        placeholder="name" />
                    <Field
                        type="url"
                        onChange={handleInputChange}
                        defaultValue={activeItem.imageUrl}
                        required
                        name="imageUrl"
                        placeholder="imageUrl" />
                    <Button.Primary name="sumbit">update</Button.Primary>
                </form>
                : null
            )
            }
            { error ? <p>ERROR: {error}</p> : null }
            { ok ? <p>Data sent successfully</p> : null }
        </EditItemPageStyles>
    )
};


const mapStateToProps = (state) => {
    return {
        ok: state.apiState.ok,
        loading: state.apiState.loading,
    }
}

export default connect(
    mapStateToProps,
    { fetchItem, updateItem }
)(Form);
