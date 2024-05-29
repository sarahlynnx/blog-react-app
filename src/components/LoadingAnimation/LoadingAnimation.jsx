import React from "react";
import './loading.scss';

const LoadingAnimation = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading">
                <div className="loading__bar"></div>
                <div className="loading__bar"></div>
                <div className="loading__bar"></div>
                <div className="loading__bar"></div>
                <div className="loading__bar"></div>
                <div className="loading__ball"></div>
            </div>
        </div>
    )
}

export default LoadingAnimation;