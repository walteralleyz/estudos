import Jhess from '../images/jhess.png';
import MMQuizz from '../images/mmquizz.png';
import Montain from '../images/montain.jpg';
import Social from '../images/social.png';
import Super from '../images/super.png';

export const projects = [
    {
        title: 'Rede Social',
        description: 'Uma rede social feita com Node, React e Mongo Cloud',
        link: 'https://github.com/walteralleyz/social_network',
        image: Social,
        techs: ['node', 'mongo', 'js']
    },

    {
        title: 'Super Lista',
        description: 'Uma lista de compras online, para armazenar items e consultar preços.',
        link: 'https://github.com/walteralleyz/superlista',
        image: Super,
        techs: ['node', 'ts', 'js', 'postgres', 'sass']
    },

    {
        title: 'Jhess',
        description: 'Um jogo de xadrez com chat.',
        link: 'https://github.com/walteralleyz/jhess',
        image: Jhess,
        techs: ['node', 'socket', 'js']
    },

    {
        title: 'Make me Quizz',
        description: 'Quizz online com poucas perguntas.',
        link: 'https://github.com/walteralleyz/make-me-quizz',
        image: MMQuizz,
        techs: ['node', 'js', 'ts', 'postgres']
    },

    {
        title: 'Instascript',
        description: 'Automatizador de instagram, feito com selenium.',
        link: 'https://github.com/walteralleyz/InstaScript',
        image: Montain,
        techs: ['node', 'js', 'selenium']
    },

    {
        title: 'Gimme News',
        description: 'Automatizador de noticias',
        link: 'https://github.com/walteralleyz/estudos/tree/main/Python/gimme-news',
        image: Montain,
        techs: ['node', 'js', 'python']
    },

    {
        title: 'Estudos',
        description: 'Meu repositório de estudos com projetos em diversas linguagens.',
        link: 'https://github.com/walteralleyz/estudos',
        image: Montain,
        techs: ['node', 'js', 'java', 'python', 'assembly']
    }
];