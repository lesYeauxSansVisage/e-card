import ICard from 'src/app/interfaces/ICard';

export const emperorDeck: ICard[] = [
  {
    id: 1,
    name: 'emperor',
    image: 'assets/imgs/Emperor.jpg',
    beats: 'citizen',
  },
  {
    id: 2,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  {
    id: 3,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  {
    id: 4,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  {
    id: 5,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
];

export const slaveDeck: ICard[] = [
  {
    id: 1,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  {
    id: 2,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  { id: 3, name: 'slave', image: 'assets/imgs/Slave.jpg', beats: 'emperor' },
  {
    id: 4,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
  {
    id: 5,
    name: 'citizen',
    image: 'assets/imgs/Citizen.jpg',
    beats: 'slave',
  },
];
