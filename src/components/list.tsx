import * as React from 'react';
import { observer } from 'mobx-react';
import styled, { keyframes } from 'styled-components';

import Row from './row';
import RoomListService from '../services/room-list-service';

interface ListProps {
    roomListService: RoomListService;
}

interface RefreshProps {
    spin: boolean;
}

const Container = styled.div`
    font-family: 'Open Sans', sans-serif;
`;

const Loading = styled.div`
    text-align: center;
    width: 100px;
`;

const rotate = keyframes`
    from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.i`
    animation: ${rotate} 1.5s infinite;
`;

const Table = styled.table`
    border-collapse: collapse;
    color: #4d4d4d;
    width: 100%;

    th {
        text-align: left;
    }
`;

const Refresh = styled.i`
    cursor: pointer;
    margin-left: 5px;

    ${(props: RefreshProps) =>
        props.spin ? `animation: ${rotate} 0.8s infinite` : ''
    }
`;

const About = styled.p`
    border-top: 1px solid #f2f2f2;
    margin: 10px 0;
    text-align: center;
    padding-top: 10px;

    a {
        color: #29668f;
        font-weight: bold;
        text-decoration: none;
    }
`;

@observer
export default class List extends React.Component<ListProps, {}> {
    componentDidMount() {
        setTimeout(() => this.props.roomListService.fetch(), 0);
    }

    render() {
        const { roomListService } = this.props;

        if (!roomListService.getSortedRooms().length) {
            return <Loading><Spinner className="fa fa-spinner" /> Loading...</Loading>;
        }

        const refresh = () => roomListService.fetch();

        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Room
                                <Refresh onClick={refresh} spin={roomListService.fetching} className="fa fa-refresh" />
                            </th>
                            <th>Players</th>
                            <th>Distance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomListService.getSortedRooms().map(room =>
                            <Row key={room.id} room={room} roomListService={roomListService} />
                        )}
                    </tbody>
                </Table>
                <About>
                    Made by noj @ <a href="http://fm-haxball.co.uk" target="_blank">fm-haxball</a>
                </About>
            </Container>
        );
    }
};
