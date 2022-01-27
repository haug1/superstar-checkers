import { IPiece, Position, Team } from "@/types";

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
