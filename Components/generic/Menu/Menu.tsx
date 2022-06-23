import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Typography, Col, Menu as MenuAntd, Row } from 'antd';
import Link from 'next/link'

const { Title } = Typography;
const menu = [
    {
        label: 'Acceuil',
        path: '/'
    }, {
        label: 'Publications',
        path: '/publications'
    },{
        label: 'Bonbons',
        path: '/bonbons'
    }
];


const Menu: FunctionComponent = () => {
    const [current, setCurrent] = useState();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Row align='middle' justify='center'>
            <Col span={2}><Title style={{ color: 'whitesmoke' }} level={3}>Hariba</Title></Col>
            <Col span={22}>
                <MenuAntd onClick={handleClick} theme='dark' selectedKeys={[current]} mode="horizontal">
                    {menu.map((i, index) => {
                        const key = index + 1;
                        return (
                            <MenuAntd.Item key={i.label}>
                                <Link key={i.label} href={i.path}>
                                    <a>
                                        {i.label}
                                    </a>
                                </Link>
                            </MenuAntd.Item>
                        );
                    })}
                </MenuAntd>
            </Col>
        </Row>
    );
};


export default Menu;
