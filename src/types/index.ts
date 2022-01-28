export enum Team {
  BOTTOM = "blue",
  LEFT_BOTTOM = "red",
  LEFT_TOP = "purple",
  TOP = "white",
  RIGHT_TOP = "yellow",
  RIGHT_BOTTOM = "green",
}

export type IPiece = {
  position: Position;
  id: string;
  team: Team;
};

export type Player = {
  name: string;
};

export interface Position {
  x: number;
  y: number;
}

export class Position {
  static NaN: Position = { x: 0, y: 0 };
}

export type IMove = {
  piece: IPiece;
  from: Position;
  to: Position;
  capture?: IPiece;
};

export type IGameState = {
  currentTeam: Team;
  pieces: IPiece[];
  winner?: Team;
};
