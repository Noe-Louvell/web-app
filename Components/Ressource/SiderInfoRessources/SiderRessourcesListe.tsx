import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Image, Button, Card, Col, Dropdown, Menu, Row, Space, Typography, Divider, List } from 'antd';
import { EllipsisOutlined, MessageOutlined, LikeOutlined, ShareAltOutlined, LikeTwoTone, HeartOutlined } from '@ant-design/icons';
import BadgeUserIndex from '../../User/BadgeUser/BadgeUser';
import { IRessource } from '../../../interfaces/IRessource';
import ListCommentIndex from '../../ListComment/ListComment';
import { SiderRessourcesCard } from './SiderRessourcesCard';
import { RessourceList } from '../../../mocks/ressource.mock';

const { Text, Paragraph } = Typography;

export const SiderRessourcesListe: FunctionComponent = () => {
    return (
        <List
                itemLayout="horizontal"
                dataSource={RessourceList}
                renderItem={item => (
                    <SiderRessourcesCard ressource={item} />
                )}
            />
    );
};


