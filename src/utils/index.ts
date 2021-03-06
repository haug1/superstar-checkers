import { BOARD_COORDS } from "@/constants";
import { IMove, IPiece, MoveDirection, Team } from "@/types";
import { Position } from "vue-router/types/router";

export const newMove = (
  piece: IPiece,
  to: Position,
  capture?: IPiece
): IMove => ({
  piece: piece,
  from: piece.position,
  to,
  capture,
});

export function move(
  position: Position,
  direction: MoveDirection,
  times = 1
): Position {
  switch (direction) {
    case MoveDirection.LEFT:
      return newPosition(position.x - times * 2, position.y);
    case MoveDirection.LEFT_DOWN:
      return newPosition(position.x - times * 1, position.y + times * 1);
    case MoveDirection.LEFT_UP:
      return newPosition(position.x - times * 1, position.y - times * 1);
    case MoveDirection.RIGHT:
      return newPosition(position.x + times * 2, position.y);
    case MoveDirection.RIGHT_DOWN:
      return newPosition(position.x + times * 1, position.y + times * 1);
    case MoveDirection.RIGHT_UP:
      return newPosition(position.x + times * 1, position.y - times * 1);
  }
}

export function getAllSimpleResultsOfMoveFunction(
  position: Position
): Position[] {
  return Object.keys(MoveDirection).map((direction) =>
    move(position, direction as MoveDirection)
  );
}

export function rotateTeam(currentTeam: Team, pieces: IPiece[]): Team {
  const teamColors = Object.keys(Team).map(
    (t) => (Team as { [key: string]: string })[t] as Team
  );

  let newTeam = currentTeam;
  do {
    const foundIndex = teamColors.indexOf(newTeam);
    const nextTeamStringKey = teamColors[(foundIndex + 1) % teamColors.length];
    newTeam = teamColors.find((c) => c == nextTeamStringKey) as Team;
  } while (pieces.filter((piece) => piece.team === newTeam).length === 0);

  return newTeam;
}

export function isMoveAllowed(
  landingPosition: Position,
  pieceToMove: IPiece,
  pieces: IPiece[],
  continueFrom: IMove | undefined
): { capture?: Position } | undefined {
  const isInsideBoard = BOARD_COORDS.some((xs, y) =>
    xs.some((x) => landingPosition.x === x && landingPosition.y === y)
  );

  const isNotOccupied = !pieces.some(
    (candidate) =>
      candidate.position.x === landingPosition.x &&
      candidate.position.y === landingPosition.y
  );

  const isWithinRange = getAllSimpleResultsOfMoveFunction(landingPosition).some(
    (resultPosition) =>
      resultPosition.x === pieceToMove.position.x &&
      resultPosition.y === pieceToMove.position.y
  );

  let capturePosition!: Position;
  const isCapture = () => {
    const minX = Math.min(landingPosition.x, pieceToMove.position.x);
    const maxX = Math.max(landingPosition.x, pieceToMove.position.x);
    const minY = Math.min(landingPosition.y, pieceToMove.position.y);
    const maxY = Math.max(landingPosition.y, pieceToMove.position.y);
    capturePosition = {
      x: minX + (maxX - minX) / 2,
      y: minY + (maxY - minY) / 2,
    };
    return pieces
      .filter((p) => p.team != pieceToMove.team)
      .some(
        (candidate) =>
          candidate.position.x === capturePosition.x &&
          candidate.position.y === capturePosition.y
      );
  };

  const continuationMoveGuard = !continueFrom
    ? true
    : pieceToMove.id === continueFrom.piece.id && isCapture();

  if (isInsideBoard && isNotOccupied && continuationMoveGuard) {
    if (isWithinRange) {
      return {
        capture: undefined,
      };
    } else if (isCapture()) {
      return {
        capture: capturePosition,
      };
    }
  }
}

export function getAllowedLandingPositions(
  piece: IPiece,
  pieces: IPiece[],
  continueFrom: IMove | undefined
): Position[] {
  const allowedLandingPositions: Position[] = [];
  Object.keys(MoveDirection).forEach((directionStr) => {
    const direction = directionStr as MoveDirection;

    for (let jump = 1; jump <= 15; jump++) {
      const landingPosition = move(piece.position, direction, jump);
      const isAllowed = isMoveAllowed(
        landingPosition,
        piece,
        pieces,
        continueFrom
      );
      if (isAllowed) {
        allowedLandingPositions.push(landingPosition);
      }
    }
  });

  return allowedLandingPositions;
}

export const newPiece = (
  x: number,
  y: number,
  teamPosition: string
): IPiece => ({
  position: { x, y },
  id: `${x},${y}`,
  team: (Team as { [key: string]: string })[teamPosition] as Team,
});

export const newPosition = (x: number, y: number): Position => ({ x, y });

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumber(min = 0, max = 0): number {
  if (!min && !max) return 0;
  let random = Math.floor(Math.random() * 10000000000);
  if (max) {
    random = random % (max - min + 1);
  }
  return random + min;
}
