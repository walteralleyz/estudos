import Profile from '../images/1.jpg';
import Github from '../images/github.png';
import Linkedin from '../images/linkedin.png';

const Aside = ({ open }) => (
    <aside className="bg-light d-flex _nav d-print-none" id="home">
        <div className='_nav__top'>
            <img src={Profile} alt='minha foto' className='img-thumbnail border-0 bg-danger rounded-circle' />
            <h3>Walter Alleyz</h3>
            <h5 className='_nav__subtitle'>Fullstack Developer</h5>
            <h5 className='_nav__subtitle'>Node | PHP | React</h5>
        </div>

        <button className='btn btn-lg btn-danger' onClick={() => open(true)}>Contate-me</button>

        <div className='_nav__bottom'>
            <a href='https://github.com/walteralleyz' target='_blank' rel='noopener noreferrer'>
                <img src={Github} alt='github' />
            </a>

            <a href='https://linkedin.com/in/walteralleyz' target='_blank' rel='noopener noreferrer'>
                <img src={Linkedin} alt='linkedin' />
            </a>
        </div>
    </aside>
);

export default Aside;