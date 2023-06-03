export interface Icecream {
  id: number;
  flavor: string;
  image: string;
}

export interface Vote {
  icecream: Icecream;
  people: string[];
}

export interface SingleVote {
  icecream: Icecream;
  name: string;
}