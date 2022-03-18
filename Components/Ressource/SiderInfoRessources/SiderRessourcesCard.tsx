import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Image, Button, Card, Col, Dropdown, Menu, Row, Space, Typography, Divider } from 'antd';
import { EllipsisOutlined, MessageOutlined, LikeOutlined, ShareAltOutlined, LikeTwoTone, HeartOutlined } from '@ant-design/icons';
import BadgeUserIndex from '../../User/BadgeUser/BadgeUser';
import { IRessource } from '../../../interfaces/IRessource';
import ListCommentIndex from '../../ListComment/ListComment';
import Link from 'next/link'
import BadgeUser from '../../User/BadgeUser/BadgeUser';

interface IPropsCardRessource {
    ressource: IRessource;
}

const { Text, Paragraph } = Typography;

export const SiderRessourcesCard: FunctionComponent<IPropsCardRessource> = ({ ressource }) => {
    return (
        <Card>
            <BadgeUser size={30} user={ressource.auteur} date={ressource.date_creation} />
            <br/>
            <Text>
                {ressource.texte}
            </Text>
            <br/>
            <Link href={`/publications/${ressource.id}`} passHref>
                <a>
                    En savoir plus !
                </a>
            </Link>

        </Card>


    );
};


