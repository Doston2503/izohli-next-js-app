import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {formatDate, formatDateWithoutYear} from "../src/utils/constants";

const Carousel = ({dayWords}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div>
            <Slider {...settings}>
                {dayWords?.map((item,index)=>(
                    <div className="item" key={index}>
                        <div className="date">{formatDateWithoutYear(item?.date)}</div>
                        <div className="text">{item?.words?.label}</div>
                    </div>
                ))}

            </Slider>
        </div>
    );
};

export default Carousel;
