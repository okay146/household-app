import React from 'react';
import SearchForm from '../components/SearchForm';
import Test from '../components/Test';


const Export = () => {
    const handleSearch = () => {

    };
    return (
        <>
            <SearchForm onSearch={handleSearch} />
            <Test />
        </>
    )
}

export default Export;

