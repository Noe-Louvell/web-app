import * as React from 'react';
import { FunctionComponent } from 'react';
import { Layout, Typography, Space, Card } from 'antd';
import { ContactSider } from '../../ContactSider/ContactSider';
import { ContextApp } from '../../../../Context/ContextAuth/ContextAuth';
const { Title, Text } = Typography;
const { Sider } = Layout;

export const SiderRight: FunctionComponent = () => {
    const { userSession } = React.useContext(ContextApp);


    return (
        <Sider className='siderRight'>
            <Space direction='vertical' style={{ width: '100%' }}>
                {/* <Card title='Actualité national'>
                    <SiderRessourcesListe />
                </Card>
                <Card title='Actualité régional'>
                    <SiderRessourcesListe />
                </Card> */}
                {userSession.utilisateur ? 
                    <Card title='Contacts'>
                        <ContactSider />
                    </Card> : <></>
                }
            </Space>

        </Sider>

    );
};
