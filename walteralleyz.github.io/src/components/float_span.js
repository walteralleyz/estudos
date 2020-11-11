const FloatSpan = ({ cvVisible, changeCVVisible }) => (
    <div className='_floatmenu d-print-none'>
        <span 
            className={`${cvVisible && 'disabled'} btn btn-sm btn-danger`}
            onClick={() => changeCVVisible(false)}
        >
            Portfolio
        </span>

        <span 
            className={`${!cvVisible && 'disabled'} btn btn-sm btn-danger`}
            onClick={() => changeCVVisible(true)}    
        >
            Curriculum
        </span>
    </div>
);

export default FloatSpan;