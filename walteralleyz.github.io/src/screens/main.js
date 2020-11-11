import { useState, useEffect } from 'react';

import Container from '../components/container';
import Aside from '../components/aside';
import Article from '../components/article';
import Experience from '../components/experience';
import Projects from '../components/projects';
import Modal from '../components/modal';
import FloatSpan from '../components/float_span';
import ResumeTemplate from '../components/resume/resume_template';

import { projects } from '../helpers/projectDetails';
import { emailAPI } from '../helpers/uriList';

export default function Main() {
    const [items, setItems] = useState(false);
    const [skill, setSkill] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cvVisible, setCVVisible] = useState(false);

    const [msgData, setMsgData] = useState({
        name: '',
        email: '',
        msg: ''
    });

    const sendEmail = () => {
        if (msgData?.email && msgData.msg && msgData.name) {
            fetch(emailAPI, {
                method: 'POST',
                body: JSON.stringify(msgData),
                headers: new Headers({
                    'content-type': 'application/json'
                })
            })
                .then(res => res.json()).then(data => {
                    window.alert('Mensagem Enviada!');
                    setShowModal(false);
                })
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        if (!skill) setItems(projects);
        else {
            const temp = projects.filter(proj => proj.techs.indexOf(skill) !== -1);
            setItems(temp);
        }
    }, [skill]);

    return (
        <div>
            <Container>
                <FloatSpan
                    cvVisible={cvVisible}
                    changeCVVisible={setCVVisible}
                />
                <Aside open={setShowModal} />
                {!cvVisible 
                ? (
                    <Article>
                        <Experience click={setSkill} />
                        <Projects items={items} />
                        <Modal
                            show={showModal}
                            close={setShowModal}
                            msg={{ data: msgData, setter: setMsgData }}
                            send={sendEmail}
                        />
                    </Article>
                ) : (
                    <Article>
                        <ResumeTemplate />
                    </Article>
                )}
            </Container>
        </div>
    );
}