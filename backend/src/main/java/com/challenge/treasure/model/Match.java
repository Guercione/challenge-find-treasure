package com.challenge.treasure.model;

import com.challenge.treasure.utils.Board;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonIgnoreProperties({"completeBoard", "hibernateLazyInitializer", "handler"})
public class Match {
    Board board = new Board();

    @JsonProperty("matchHash")
    private final Integer matchHash = hashCode();

    @JsonProperty("userName")
    private String userName;

    @JsonProperty("turns")
    private Integer turns;

    @JsonProperty("treasures")
    private Integer treasures;

    @JsonProperty("done")
    private Boolean done;

    @JsonProperty("userBoard")
    private ArrayList<ArrayList<Integer>> userBoard = board.generateInitialBoard();

    private ArrayList<ArrayList<Integer>> completeBoard = board.generateCompleteBoard();

    public Match(String userName) {
        this.userName = userName;
        this.turns = 0;
        this.done = false;
        this.treasures = 0;
    }

    public String getUserName() {
        return userName;
    }

    public Integer getMatchHash() {
        return matchHash;
    }

    public Integer getTurns() {
        return turns;
    }

    public void setTurns(Integer turns) {
        this.turns = turns;
    }

    public Integer getTreasures() {
        return treasures;
    }

    public void setTreasures(Integer treasures) {
        this.treasures = treasures;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public ArrayList<ArrayList<Integer>> getUserBoard() {
        return userBoard;
    }

    public void setUserBoard(Integer x, Integer y) {
        ArrayList<ArrayList<Integer>> userBoard = this.userBoard;
        ArrayList<ArrayList<Integer>> completeBoard = this.completeBoard;
        Integer completeBoardValue = completeBoard.get(x).get(y);

        userBoard.get(x).set(y, completeBoardValue);

        if (completeBoardValue == 9) {
            setTreasures(this.treasures.intValue() + 1);
        }

        this.userBoard = userBoard;
    }

    public ArrayList<ArrayList<Integer>> getCompleteBoard() {
        return completeBoard;
    }
}
