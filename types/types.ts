export enum JokeType {
  single = 'single',
  twopart = 'twopart',
};

export type SingleJoke = {
  id: number;
  type: JokeType.single;
  joke: string;
};

export type TwoPartJoke = {
  id: number;
  type: JokeType.twopart;
  setup: string;
  delivery: string;
};

export type JokeFromServer = SingleJoke | TwoPartJoke;

export type Joke = JokeFromServer & {
  isLiked: boolean;
};
