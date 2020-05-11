package com.challenge.treasure.utils;

import java.util.ArrayList;

public class Board {
    public ArrayList<ArrayList<Integer>> generateInitialBoard() {
        ArrayList<ArrayList<Integer>> board = new ArrayList<ArrayList<Integer>>();

        for(int x = 0; x < 5; x++) {
            board.add(new ArrayList<Integer>());
            for (int y = 0; y < 5; y++) {
                board.get(x).add(0);
            }
        }

        return board;
    }

    public ArrayList<ArrayList<Integer>> generateCompleteBoard() {
        ArrayList<ArrayList<Integer>> board = new ArrayList<ArrayList<Integer>>();

        for(int x = 0; x < 5; x++) {
            board.add(new ArrayList<Integer>());
        }

        board.get(0).add(3);
        board.get(0).add(9);
        board.get(0).add(3);
        board.get(0).add(2);
        board.get(0).add(1);

        board.get(1).add(2);
        board.get(1).add(3);
        board.get(1).add(2);
        board.get(1).add(3);
        board.get(1).add(2);

        board.get(2).add(1);
        board.get(2).add(2);
        board.get(2).add(3);
        board.get(2).add(9);
        board.get(2).add(3);

        board.get(3).add(2);
        board.get(3).add(3);
        board.get(3).add(2);
        board.get(3).add(3);
        board.get(3).add(2);

        board.get(4).add(3);
        board.get(4).add(9);
        board.get(4).add(3);
        board.get(4).add(2);
        board.get(4).add(1);

        return board;
    }
}
