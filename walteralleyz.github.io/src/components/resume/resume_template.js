const ResumeTemplate = () => (
    <div className="container bg-light py-2">
        <div id="hd">
            <div className="card p-3">
                <div className="yui-u first">
                    <h3><button className='btn btn-danger btn-large float-right d-print-none' onClick={() => window.print()}>Download PDF</button></h3>
                    <h1>Walter Alleyz</h1>
                    <h5 className="font-italic">Desenvolvedor Backend e Frontend Quebra-galho</h5>
                </div>

                <div className="yui-u">
                    <div className="contact-info">
                        <h3><a href="mailto:walterdasilvasantos@gmail.com">walterdasilvasantos@gmail.com</a></h3>
                        <h6 className="font-weight-bold">(47) 99602-8910</h6>
                    </div>
                </div>
            </div>
        </div>

        <div id="bd">
            <div id="yui-main">
                <div className="yui-b">

                    <div className="card my-2">
                        <div className="card-header font-weight-bold">
                            Perfil
                        </div>
                        <div className="card-body">
                            <p>
                                Autodidata, aprendendo e aplicando o conhecimento no dia dia. Busco estar sempre atualizado com as novidades techs, e além de codar, adoro jogos RPG.
                            </p>
                        </div>
                    </div>

                    <div className="card my-2">
                        <div className="card-header font-weight-bold">
                            Habilidades
                        </div>
                        <div className="card-body d-flex text-justify" style={{ gap: "25px" }}>
                            <h5 style={{ flexGrow: '1' }}>1. Pensamento Lógico orientado ao Negócio</h5>

                            <h5 style={{ flexGrow: '1' }}>2. Adaptativo e Resiliente</h5>                            

                            <h5 style={{ flexGrow: '1' }}>3. Autodidata</h5>
                        </div>
                    </div>

                    <div className="card my-2">
                        <div className="card-header font-weight-bold">
                            Hard Skills
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>HTML</li>
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>CSS/SCSS</li>
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>Javascript</li>
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>REST</li>
                            </ul>

                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>NodeJS</li>
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>React</li>
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>Java</li>
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>TypeORM</li>
                            </ul>

                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>GIT/Github</li>
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>MongoDB</li>
                                <li className="list-group-item bg-dark text-light" style={STYLES.listItem}>Linux</li>
                                <li className="list-group-item bg-warning" style={STYLES.listItem}>PostgreSQL</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card my-2">
                        <div className="card-header font-weight-bold">
                            Experiências Profissionais
                        </div>

                        <div className="card-body">
                            <div>
                                <h4>Freelancer</h4>
                                <h5>Desenvolvedor Web</h5>
                                <h5 className="text-secondary font-italic">4 Meses (2020)</h5>
                                <p>
                                    Desenvolvimento de formulários para uma financeira utilizando React, Redux e Sass. Um pouco de backend com Node, Express e MongoDB, para desenvolver um sistema de integração com emails e geração de PDF.
                                </p>
                            </div>

                            <div>
                                <h4>Best Soluções Financeiras</h4>
                                <h5>Estágio FrontEnd</h5>
                                <h5 className="text-secondary font-italic">8 Meses (2018)</h5>
                                <p>Desenvolvimento de páginas WEB, automação de processos em Python, coleta de dados de clientes, criação de filtros e ferramentas para segurança de informação, consumo e vinculação de APIs.</p>
                            </div>
                        </div>
                    </div>


                    <div className="card my-2">
                        <div className="card-header font-weight-bold">
                            Educação
                        </div>
                        <div className="card-body">
                            <h4>Centro Universitário Cesumar Maringá</h4>
                            <h5>Engenharia de Software, EAD - <strong>Trancado</strong> </h5>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div className="text-center p-1" style={{ borderTop: "2px solid #ccc" }}>
            <p>Walter Alleyz &mdash; <a href="mailto:walterdasilvasantos@gmail.com">Me Mande um Email</a> &mdash; (47) 99602-8910</p>
        </div>

    </div>
);

const STYLES = {
    listItem: {
        flexGrow: '1', 
        borderRadius: '0', 
        flexBasis: "25%"
    }
}

export default ResumeTemplate;