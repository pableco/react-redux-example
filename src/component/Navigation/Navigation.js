import React from 'react';
import { connect } from "react-redux";

import List from "../List/List"
import Form from "../Form/Form"


const Navigation = ({ match:{ params } }) => {

    const renderSection = () =>{
        switch (params.section){
            case 'list':
                return <List />;
            case 'edit':
                return <Form />;
            case '404':
            default:
                return <h1>Not found</h1>;
        }
    }

    return renderSection();
}

const mapStateToProps = (state) => {
    return {
        section: state.section
    }
}

export default connect(
    mapStateToProps,
    {}
)(Navigation);
