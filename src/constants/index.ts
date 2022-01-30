export const BOARD_COORDS = [
  [15],
  [14, 16],
  [13, 15, 17],
  [12, 14, 16, 18],
  [11, 13, 15, 17, 19],
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
  [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
  [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
  [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
  [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
  [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
  [11, 13, 15, 17, 19],
  [12, 14, 16, 18],
  [13, 15, 17],
  [14, 16],
  [15],
];

export const TEAM_COORDS_MAP: { [key: string]: number[][] } = {
  TOP: [
    [15, 0],
    [14, 1],
    [16, 1],
    [13, 2],
    [15, 2],
    [17, 2],
    [12, 3],
    [14, 3],
    [16, 3],
    [18, 3],
    [11, 4],
    [13, 4],
    [15, 4],
    [17, 4],
    [19, 4],
  ],
  LEFT_TOP: [
    [0, 5],
    [2, 5],
    [4, 5],
    [6, 5],
    [8, 5],
    [7, 6],
    [5, 6],
    [3, 6],
    [1, 6],
    [2, 7],
    [4, 7],
    [6, 7],
    [5, 8],
    [3, 8],
    [4, 9],
  ],
  LEFT_BOTTOM: [
    [0, 15],
    [1, 14],
    [2, 13],
    [3, 12],
    [4, 11],
    [5, 12],
    [6, 13],
    [7, 14],
    [8, 15],
    [6, 15],
    [5, 14],
    [4, 13],
    [3, 14],
    [2, 15],
    [4, 15],
  ],
  BOTTOM: [
    [15, 20],
    [14, 19],
    [13, 18],
    [12, 17],
    [11, 16],
    [13, 16],
    [14, 17],
    [15, 18],
    [16, 19],
    [17, 18],
    [16, 17],
    [15, 16],
    [17, 16],
    [18, 17],
    [19, 16],
  ],
  RIGHT_BOTTOM: [
    [22, 15],
    [23, 14],
    [24, 13],
    [25, 12],
    [26, 11],
    [27, 12],
    [26, 13],
    [25, 14],
    [24, 15],
    [26, 15],
    [27, 14],
    [28, 13],
    [29, 14],
    [28, 15],
    [30, 15],
  ],
  RIGHT_TOP: [
    [22, 5],
    [23, 6],
    [24, 7],
    [25, 8],
    [26, 9],
    [27, 8],
    [26, 7],
    [25, 6],
    [24, 5],
    [26, 5],
    [27, 6],
    [28, 7],
    [29, 6],
    [28, 5],
    [30, 5],
  ],
};
