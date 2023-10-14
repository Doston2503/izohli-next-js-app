import {AppProps} from 'next/app'
import * as React from "react";
import Layout from "../components/Layout";
import '/src/style/globall.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component, pageProps}) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <ToastContainer/>
        </>
    )
}