import * as React from 'react';
import { observer } from 'mobx-react';
import { Room } from 'haxball-roomlist-parser';
import styled from 'styled-components';

import RoomListService from '../services/room-list-service';

interface ListProps {
    room: Room,
    roomListService: RoomListService
}

const Flag = styled.img`
    margin-right: 5px;
`;

const Row = styled.tr`
    &:nth-child(even) {
        background: #f8f8f8;
    }

    td {
        padding: 4px;
    }

    .fa-lock {
        color: #e95b5b;
    }
`;

const Name = styled.div`
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Link = styled.a`
    color: inherit;
    text-decoration: none;
`;

const Players = styled.td`
    text-align: center;
`;

const row = ({ room, roomListService }: ListProps) => {
    const getUrl = (room: Room) => {
        let url = `http://haxball.com?roomid=${room.id}`;

        if (room.hasPassword) {
            url += '&pass=1';
        }

        return url;
    };

    return (
        <Row>
            <td>
                <Name>
                    <Flag src={`../images/flags/${room.country}.png`} />
                    <Link href={getUrl(room)} target="_blank">{room.name}</Link>
                </Name>
            </td>
            <Players>{room.players}/{room.maxPlayers}</Players>
            <td>{(roomListService.getDistanceToRoom(room) / 1000).toFixed(0)}km</td>
            <td>{room.hasPassword && <i className="fa fa-lock" />}</td>
        </Row>
    );
};

export default observer(row);
