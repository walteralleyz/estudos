const Projects = ({ items }) => (
    <div className='_projects _pages d-flex'>
        <h2 className='font-weight-bold text-center title'>
            <mark className='text-light bg-dark'>&#128194; Meus Projetos</mark>
        </h2>
        <div className='_projects__slider'>
            {items && items.map((item, key) => (
                <div className='card' key={`project-${key}`}>
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <a href={item.link} className="btn btn-info" target='_blank' rel='noopener noreferrer'>Consulte o Código</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Projects;