import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { deleteItem } from '../../redux/actions/apiActions';
import Button from '../../commonStyles/Buttons.styles';

const Item = ({data, deleteItem}) => {
    return (
        <li id={data.id}>
            <h5>{data.name}</h5>
            <LazyLoadImage
                alt={data.name}
                src={data.imageUrl}
                />
            <Link to={`/edit/${data.id}`}>
                <Button.Invert>
                    Edit
                </Button.Invert>
            </Link>
            <Button mods={['danger']} onClick={() => deleteItem(data.id)}>
                Delete
            </Button>
        </li>
    );
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(
    (mapStateToProps),
    { deleteItem }
)(Item);
