import { TEAM_COORDS_MAP } from "@/constants/board-consts";
import { IGameState, IMove, IPiece, Team } from "@/types";
import {
  getAllowedLandingPositions,
  isMoveAllowed,
  newMove,
  rotateTeam,
} from "@/utils/move-utils";
import { newPiece } from "@/utils/piece-utils";
import { sleep } from "@/utils/promise-utils";
import { getRandomNumber } from "@/utils/rng";
import Vue from "vue";
import { Position } from "vue-router/types/router";

const state = Vue.observable<IGameState>({
  currentTeam: Team.BOTTOM,
  pieces: [],
});

export const gameEngine = {
  state,
  setupDefaultPieces(): void {
    const piecesToAdd: IPiece[] = [];
    Object.keys(TEAM_COORDS_MAP).forEach((k: string) => {
      const teamCoordinates = TEAM_COORDS_MAP[k];
      teamCoordinates.forEach(([x, y]) => {
        piecesToAdd.push(newPiece(x, y, k));
      });
    });
    state.pieces = state.pieces.concat(piecesToAdd);
  },
  getCurrentTeamPieces(): IPiece[] {
    return state.pieces.filter((piece) => piece.team == state.currentTeam);
  },
  getAllAvailableMoves(): IMove[] {
    return this.getCurrentTeamPieces().reduce<IMove[]>((moves, piece) => {
      return moves.concat(
        getAllowedLandingPositions(piece, state.pieces).map((pos) =>
          newMove(
            piece,
            pos,
            this.getPieceAtPosition(
              isMoveAllowed(pos, piece, state.pieces)?.capture
            )
          )
        )
      );
    }, []);
  },
  getPieceAtPosition(refPos?: Position): IPiece | undefined {
    if (!refPos) return undefined;
    return state.pieces.find(
      ({ position }) => position.x === refPos.x && position.y === refPos.y
    );
  },
  getRandomMove(): IMove {
    const availableMoves = this.getAllAvailableMoves();
    return availableMoves.some((move) => move.capture)
      ? // eslint-disable-next-line
        availableMoves.find((move) => move.capture)!
      : availableMoves[getRandomNumber(0, availableMoves.length - 1)];
  },
  async computerMove(): Promise<void> {
    const move = this.getRandomMove();
    // eslint-disable-next-line
    const piece = this.getPieceAtPosition(move.from)!;
    await sleep(500);
    await this.makeMove(piece, move);
  },
  async makeMove(piece: IPiece, move: IMove): Promise<void> {
    piece.position = move.to;
    this.removePiece(move.capture);

    const continuationMove = this.getAllAvailableMoves().filter(
      (m) => m.pieceId === piece.id && m.capture
    );
    const canContinue = continuationMove.length > 0 && move.capture;

    if (!canContinue) {
      state.currentTeam = rotateTeam(state.currentTeam);
    }

    if (state.currentTeam !== Team.BOTTOM) {
      await this.computerMove();
    }
  },
  removePiece(piece?: IPiece): void {
    if (!piece) return;
    state.pieces = state.pieces.filter(({ id }) => id !== piece.id);
  },
  resetPieces(): void {
    state.pieces = [];
  },
  startGame(): void {
    this.resetPieces();
    this.setupDefaultPieces();
    state.currentTeam = Team.BOTTOM;
  },
};
