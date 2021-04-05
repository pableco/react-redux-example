import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { fetchData } from '../../redux/actions/apiActions';
import Item from '../Item/Item';
import Button from '../../commonStyles/Buttons.styles';
import { ReactComponent as SearchSVG } from '../../commonStyles/icons/search.svg';
import Field from '../../commonStyles/Form';


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MessageList = ({ list, loading, fetchData, error}) => {

    const history = useHistory();
    const defaultQuery = useQuery().get('q')

    const [search, setSearch] = useState({
        searchKey: defaultQuery,
    })

    useEffect(()=>{
        fetchData({q: defaultQuery});
    },[ fetchData, defaultQuery ])


    const handleInputChange = (event) => {
        setSearch({
            ...search,
            [event.target.name] : event.target.value
        })
    }

    const requestSearch = (event) => {
        event.preventDefault()
        const { searchKey } = search;
        const toPush = searchKey !== '' && `?q=${searchKey}`;
        history.push(toPush);
    }


    return (
        <section>
            <form className="row" onSubmit={requestSearch}>
                <Field
                    type="text"
                    onChange={handleInputChange}
                    pattern="(?:[A-Za-z][- ]?){3,}"
                    defaultValue={search.searchKey}
                    name="searchKey"
                    placeholder="search"
                />
                <Button.Action name="sumbit">
                    <SearchSVG />
                </Button.Action>
            </form>
            { loading ? <p>Loading ...</p> : null }
            { error ? <p>Error: {error}</p> : null }
            <ul>
                {
                    (!loading && list?.length)
                        ? list.map((item, index) => <Item data={item} key={index} />)
                        : null
                }
            </ul>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        q: state.apiState.q,
        list: state.apiState.list,
        loading: state.apiState.loading,
        error: state.apiState.error,
    }
}

export default connect(
    mapStateToProps,
    { fetchData }
)(MessageList);
