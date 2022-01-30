import { IPiece, Position, Team, MoveDirection } from "@/types";
import {
  getAllowedLandingPositions,
  isMoveAllowed,
  move,
  newPosition,
} from "@/utils";

describe("move({x:11,y:14},LEFT)", () => {
  test("returns 9,14 as expected", () => {
    expect(move({ x: 11, y: 14 }, MoveDirection.LEFT)).toEqual({ x: 9, y: 14 });
  });
});

describe("isMoveAllowed", () => {
  test("returns undefined as expected", () => {
    expect(
      isMoveAllowed(
        newPosition(7, 14),
        {
          position: newPosition(11, 14),
          id: "",
          team: Team.BOTTOM,
        },
        [],
        undefined
      )
    ).toEqual(undefined);
  });

  test("returns object as expected", () => {
    expect(
      isMoveAllowed(
        newPosition(9, 14),
        {
          position: newPosition(11, 14),
          id: "",
          team: Team.BOTTOM,
        },
        [],
        undefined
      )
    ).not.toEqual(undefined);
  });

  test("returns object with capture true as expected", () => {
    const mockPiece = {
      position: newPosition(4, 9),
      id: "0",
      team: Team.BOTTOM,
    };
    const mockCapturePiece = {
      position: newPosition(5, 10),
      id: "1",
      team: Team.LEFT_BOTTOM,
    };
    expect(
      isMoveAllowed(newPosition(4, 9), mockPiece, [mockCapturePiece], undefined)
    ).not.toEqual({ capture: true });
  });
});
describe("getAvailableMoves", () => {
  const piece: IPiece = {
    position: newPosition(11, 14),
    id: "",
    team: Team.BOTTOM,
  };
  const enemyPiece: IPiece = {
    id: "",
    position: newPosition(13, 12),
    team: Team.LEFT_BOTTOM,
  };
  const expectedPositions = [
    newPosition(9, 14),
    newPosition(13, 14),
    newPosition(12, 13),
    newPosition(10, 13),
    newPosition(10, 15),
    newPosition(12, 15),
  ];

  const assertIsEqualNoStrictOrder = (
    candidate: Position[],
    expected: Position[]
  ) =>
    expect(candidate.sort((a, b) => a.x - b.x)).toEqual(
      expected.sort((a, b) => a.x - b.x)
    );

  test("with capture move test", () => {
    const candidate = getAllowedLandingPositions(
      piece,
      [enemyPiece],
      undefined
    );
    const expected = [...expectedPositions, newPosition(15, 10)];

    assertIsEqualNoStrictOrder(candidate, expected);
  });
});
