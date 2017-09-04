import * as React from 'react';
import { render } from 'react-dom';

import List from './components/list';
import RoomListService from './services/room-list-service';

const roomListService = new RoomListService;

render(
    <List roomListService={roomListService} />,
    document.getElementById('mount')
);
