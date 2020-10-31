import Skills from './skills';

import Node from '../images/node.png';
import JS from '../images/javascript.png';
import TS from '../images/typescript.webp';
import Postgres from '../images/postgres.png';
import Mongo from '../images/mongo.webp';
import Sass from '../images/sass.png';
import Github from '../images/github.png';
import Api from '../images/api.png';

const Experience = ({ click }) => (
    <nav className='navbar navbar-dark bg-info' id="experience">
        <Skills handleClick={() => click('node')} image={Node} txt={'Node.JS'} />
        <Skills handleClick={() => click('js')} image={JS} txt={'JS'} />
        <Skills handleClick={() => click('ts')} image={TS} txt={'TS'} />
        <Skills handleClick={() => click('postgres')} image={Postgres} txt={'Postgres'} />
        <Skills handleClick={() => click('mongo')} image={Mongo} txt={'MongoDB'} />
        <Skills handleClick={() => click('sass')} image={Sass} txt={'Sass'} />
        <Skills image={Github} txt={'Github'} />
        <Skills image={Api} txt={'APIs'} />
    </nav>
);

export default Experience;