import { Card } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import LoginConnect from './Formulaires/LoginConnect';
import LoginCreate from './Formulaires/LoginCreate';


const tabList = [
    {
        key: 'connect',
        tab: 'Se connecter',
    },
    {
        key: 'createAccount',
        tab: 'Créer un compte',
    },
];
const contentList = {
    connect: <LoginConnect />,
    createAccount: <LoginCreate />,
};

const Login: React.FunctionComponent = () => {
    const [activeTabKey1, setActiveTabKey1] = useState('connect');
    const onTab1Change = key => {
        setActiveTabKey1(key);
    };

    return (
        <div className='center'>
            <Card
                style={{ width: '550px' }}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={key => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTabKey1]}
            </Card>
        </div>
    );
};

export default Login;

