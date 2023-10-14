import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {useRouter} from 'next/router';
import SearchComponent from "./SearchComponent";

function Layout({children}) {
    const router = useRouter();
    const currentPath = router.pathname;
    const word = router?.query?.word;

    return (
        <div>
            {currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/contact'
            && !currentPath.startsWith('/admin') ? (
                <Navbar/>
            ) : (
                ''
            )}
            {currentPath === '/' || currentPath === '/word-of-day' || currentPath.startsWith('/alphabet')
            || currentPath.startsWith('/search') ? (
                <SearchComponent word={word}/>
            ) : (
                ''
            )}

            <div className="main-layout">{children}</div>

            {currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/contact'
            && !currentPath.startsWith('/admin')
                ? (
                    <Footer/>
                ) : (
                    ''
                )}
        </div>
    );
}

export default Layout;