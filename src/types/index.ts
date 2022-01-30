export enum Team {
  BOTTOM = "rgb(0, 0, 255)",
  LEFT_BOTTOM = "rgb(255, 0, 0)",
  LEFT_TOP = "rgb(204, 0, 255)",
  TOP = "rgb(255, 255, 255)",
  RIGHT_TOP = "rgb(255, 255, 0)",
  RIGHT_BOTTOM = "rgb(0, 255, 0)",
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

export type IUIPieces = {
  [y: number]: { [x: number]: IPiece | undefined };
};

export type IGameState = {
  gameStarted: boolean;
  currentTeam: Team;
  pieces: IPiece[];
  winner?: Team;
};

export enum MoveDirection {
  LEFT = "LEFT",
  LEFT_UP = "LEFT_UP",
  LEFT_DOWN = "LEFT_DOWN",
  RIGHT = "RIGHT",
  RIGHT_UP = "RIGHT_UP",
  RIGHT_DOWN = "RIGHT_DOWN",
}
