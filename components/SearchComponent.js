import React, {useState} from 'react';
import {useRouter} from 'next/router';

function SearchComponent(props) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState(props.word);
    function searchWord(e) {
        e.preventDefault();
        setInputValue(e.target.searchInput?.value || '');
        router.push(e.target.searchInput.value ? '/search/' + e.target.searchInput.value : '/');
    }
    return (
        <div className="search-component">
            <form onSubmit={searchWord} className="search-area">
                <button type={'submit'} className="search-icon">
                    <img src="/images/search.svg" alt=""/>
                </button>
                <input
                    value={inputValue}
                    onChange={(e) =>setInputValue(e.target.value)}
                    placeholder="So’zni izlash ..."
                    id="searchInput"
                    name="searchInput"
                    className="search-input"
                    type="search"
                />
            </form>
        </div>
    );
}

export default SearchComponent;
