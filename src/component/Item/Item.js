import React, { useCallback } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import { deleteItem } from '../../redux/actions/apiActions';
import Button from '../../styles/Buttons.styles';
import { ItemListStyles, KeypadStyles } from '../../styles/Layouts.styles';

const Item = ({data, deleteItem}) => {
    const history = useHistory();
    const handleOnClickEdit = useCallback(() => history.push(`/edit/${data.id}`), [ history, data.id ]);

    return (
        <ItemListStyles id={data.id}>
            <h4>{data.name}</h4>
            <img alt={data.name} src={data.imageUrl} />
            <KeypadStyles>
                <Button.Invert onClick={() => handleOnClickEdit()}>
                    Edit
                </Button.Invert>
                <Button mods={['danger']} onClick={() => deleteItem(data.id)}>
                    Delete
                </Button>
            </KeypadStyles>
        </ItemListStyles>
    );
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(
    (mapStateToProps),
    { deleteItem }
)(Item);
