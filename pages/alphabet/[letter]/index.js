import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import {PATH_NAME} from "../../../src/utils/constants";
import {toast} from "react-toastify";

function Index(props) {
    const arr = [
        'A',
        'B',
        'D',
        'E',
        'F',
        'G',
        'H',
        'L',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'X',
        'Y',
        'Z',
        'O’',
        'G’',
        'Sh',
        'Ch',
    ];
    const [words, setWords] = useState([]);
    const router = useRouter();
    const letter = router?.query?.letter;

    function selectedLetter(letter) {
        router.push(`/alphabet/${letter}`)
    }

    function selectedWord(word) {
        router.push(`/search/${word}`)
    }

    function getAllDayWord() {
        const token = localStorage.getItem('accessToken');
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        axios.get(`${PATH_NAME}words/get-all-word-search?latter=${letter}&page=1&size=100`, headers)
            .then((response) => {
                if (response.data?.success) {
                    setWords(response.data?.data?.content)
                }
            })
            .catch((error) => {
                toast.error('Error');
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getAllDayWord()
    }, [letter]);
    return (
        <div className="tab-response-component">
            <div className="container">
                <ul className="alphabet">
                    {arr.map((item, index) => (
                        <li onClick={() => selectedLetter(item)} className={letter === item ? 'active-list' : ''}
                            key={index}>{item}</li>
                    ))}
                </ul>

                <hr/>

                <div className="choose-letter">{letter} harfidan boshlanadigan so‘zlar</div>

                <div className="row">
                    {words?.map((item, index) => (
                        <div className="col-xl-2 col-sm-6 col-6" key={index}>
                            <div onClick={() => selectedWord(item?.label)} className="word"># {item?.label}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Index;
