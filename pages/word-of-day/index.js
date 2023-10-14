import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import MainWord from '../../components/MainWord';
import Carousel from "../../components/Carousel";
import Head from "next/head";
import axios from "axios";
import {formatDate, PATH_NAME} from "../../src/utils/constants";
import {toast} from "react-toastify";

function Index(props) {
    const [dayWords, setDayWords] = useState([]);

    function getAllDayWords() {
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        };
        axios.get(`${PATH_NAME}day-words/get-all`, headers)
            .then((response) => {
                if (response.data?.success) {
                    setDayWords(response.data.data);
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getAllDayWords();
    }, []);

    return (
        <>
            <Head>
                <title>Word of day</title>
            </Head>
            <div className="page-word-of-the-day">
                <div className="main-title">KUN SO'ZI</div>

                <div className="page-content">
                    <div className="my-carousel">
                        <Carousel dayWords={dayWords}/>
                    </div>
                    <div className="auth-text">
                        {/* <Link href={'/register'}>
                            Ro'yxatdan <br/> o'tish
                            <img src="/images/arrow-top.svg" alt=""/>
                        </Link>*/}
                        <div className="text">
                            Har kungi "Kun so'zi" ni pochtangizga qabul qiling!
                        </div>
                    </div>
                </div>

                {dayWords?.map((item, index) => (
                    <div className="page-body" key={index}>
                        <MainWord dayWords={item}/>
                    </div>
                ))}


                {/*<button className="show-all-words">Barchasini ko'rsatish</button>*/}

                <hr/>

                <div className="word-box">

                    <div className="d-flex flex-wrap justify-content-between">
                        {dayWords?.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="date">{formatDate(item?.date)}</div>
                                <div className="text">{item?.words?.label}</div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}

export default Index;