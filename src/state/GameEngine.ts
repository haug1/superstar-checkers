import { TEAM_COORDS_MAP } from "@/constants";
import { IGameState, IMove, IPiece, Team } from "@/types";
import {
  getAllowedLandingPositions,
  getRandomNumber,
  isMoveAllowed,
  newMove,
  newPiece,
  rotateTeam,
  sleep,
} from "@/utils";
import Vue from "vue";
import { Position } from "vue-router/types/router";

export const PLAYER_TEAM = Team.BOTTOM;

const state = Vue.observable<IGameState>({
  continueFrom: undefined,
  gameStarted: false,
  currentTeam: PLAYER_TEAM,
  pieces: [],
  winner: undefined,
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
        getAllowedLandingPositions(piece, state.pieces, state.continueFrom).map(
          (pos) =>
            newMove(
              piece,
              pos,
              this.getPieceAtPosition(
                isMoveAllowed(pos, piece, state.pieces, state.continueFrom)
                  ?.capture
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
  getRandomComputerMove(): IMove {
    const availableMoves = this.getAllAvailableMoves();
    const captureMoves = availableMoves.filter((move) => move.capture);
    return captureMoves.length > 0
      ? captureMoves[getRandomNumber(0, captureMoves.length - 1)]
      : availableMoves[getRandomNumber(0, availableMoves.length - 1)];
  },
  async computerMove(): Promise<void> {
    await sleep(500);
    const move = this.getRandomComputerMove();
    await this.makeMove(move.piece, move);
  },
  async makeMove(piece: IPiece, move: IMove): Promise<void> {
    piece.position = move.to;
    this.removePiece(move.capture);
    this.checkForWinner();

    if (!state.winner) {
      await this.nextTurn(piece, move);
    }
  },
  async nextTurn(piece: IPiece, move: IMove): Promise<void> {
    const continuationMove = this.getAllAvailableMoves().filter(
      (m) => m.piece.id === piece.id && m.capture
    );
    const canContinue = continuationMove.length > 0 && move.capture;

    if (!canContinue) {
      state.currentTeam = rotateTeam(state.currentTeam, state.pieces);
      state.continueFrom = undefined;
    } else {
      state.continueFrom = move;
    }

    if (state.currentTeam !== PLAYER_TEAM) {
      await this.computerMove();
    }
  },
  checkForWinner(): void {
    const remainingTeams = [...new Set(state.pieces.map((p) => p.team))];
    if (remainingTeams.length === 1) {
      state.winner = remainingTeams[0];
    }
  },
  removePiece(piece?: IPiece): void {
    if (!piece) return;
    state.pieces = state.pieces.filter(({ id }) => id !== piece.id);
  },
  startGame(): void {
    state.pieces = [];
    state.winner = undefined;
    state.currentTeam = PLAYER_TEAM;
    state.gameStarted = true;
    this.setupDefaultPieces();
  },
};
