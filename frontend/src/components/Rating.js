import React from 'react';
// import PropTypes from 'prop-types'

const Rating = ({value, text, color}) => {
    return (
        <div className='rating'>
            {[1,2,3,4,5].map((num, idx)=>{
                return (
                    <span key={idx}>
                        <i style={{color: color}} className={
                            value >= num ?
                            'fas fa-star' :
                            value >= (num - 0.5) ?
                            'fas fa-star-half-alt' :
                            'far fa-star'}>
                        </i>
                    </span>
                )
            })}
            <span>
                {text && text}
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
};

// Rating.propTypes = {
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string.isRequired
// }

export default Rating
