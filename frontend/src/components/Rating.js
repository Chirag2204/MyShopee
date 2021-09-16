import React from "react";
import PropTypes from "prop-types";

function Rating(props) {
    return (
        <div className="product-rating">
            <span>
                <i style={{ color: props.color }}
                    className={
                        props.rating >= 1 ?
                            "fas fa-star" :
                            props.rating >= 0.5 ?
                                "fas fa-star-half-alt" :
                                "far fa-star"
                    }
                ></i>
                <i style={{ color: props.color }}
                    className={
                        props.rating >= 2 ?
                            "fas fa-star" :
                            props.rating >= 1.5 ?
                                "fas fa-star-half-alt" :
                                "far fa-star"
                    }
                ></i>
                <i style={{ color: props.color }}
                    className={
                        props.rating >= 3 ?
                            "fas fa-star" :
                            props.rating >= 2.5 ?
                                "fas fa-star-half-alt" :
                                "far fa-star"
                    }
                ></i>
                <i style={{ color: props.color }}
                    className={
                        props.rating >= 4 ?
                            "fas fa-star" :
                            props.rating >= 3.5 ?
                                "fas fa-star-half-alt" :
                                "far fa-star"
                    }
                ></i>
                <i style={{ color: props.color }}
                    className={
                        props.rating >= 5 ?
                            "fas fa-star" :
                            props.rating >= 4.5 ?
                                "fas fa-star-half-alt" :
                                "far fa-star"
                    }
                ></i>
            </span>
        </div>
    )
}
Rating.defaultProps = {
    color: "#e3ca09"
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    text: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default Rating;