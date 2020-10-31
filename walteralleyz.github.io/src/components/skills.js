const Skills = ({ image, txt, handleClick }) => (
    <div className='text-center navbar__skills' onClick={handleClick}>
        <img 
            src={image}
            className='navbar__tech rounded-circle img-thumbnail bg-light border-0'
            alt='Tecnologia' />
        <p className='m-0'>{txt}</p>
    </div>
);

export default Skills;