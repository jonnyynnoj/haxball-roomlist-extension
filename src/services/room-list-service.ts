import { observable } from 'mobx';
import { fetchRooms, Room } from 'haxball-roomlist-parser';
import { getDistance } from 'geolib';

export default class RoomListService {
    @observable
    private rooms: Room[] = [];

    @observable
    private position?: Position;

    @observable
    public fetching = false;

    public constructor() {
        navigator.geolocation.getCurrentPosition(position => {
            this.position = position;
        });
    }

    public async fetch() {
        this.fetching = true;
        this.rooms = await fetchRooms();
        this.fetching = false;
    }

    public getFilteredRooms(): Room[] {
        const sortByDistance = (a: Room, b: Room) => {
            return this.getDistanceToRoom(a) - this.getDistanceToRoom(b);
        };

        return [...this.rooms].sort(sortByDistance);
    }

    public getDistanceToRoom(room: Room): number {
        if (!this.position) {
            return 0;
        }

        return getDistance(room, {
            latitude: this.position.coords.latitude,
            longitude: this.position.coords.longitude
        });
    }
}
