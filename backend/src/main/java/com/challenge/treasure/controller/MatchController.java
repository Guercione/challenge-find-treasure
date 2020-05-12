package com.challenge.treasure.controller;

import com.challenge.treasure.model.Match;
import com.challenge.treasure.model.Position;
import com.challenge.treasure.service.MatchService;

import com.challenge.treasure.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class MatchController {
    @Autowired
    private MatchService matchService;

    @Autowired
    private ScoreService scoreService;

    @PostMapping("/new-game")
    public ResponseEntity<Match> create(@RequestBody Map<String,Object> body) {
        try {
            String userName = body.get("userName").toString();

            if (!userName.isBlank()) {
                Match match = matchService.setMatch(userName);
                return new ResponseEntity<>(match, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/board/{id}")
    public @ResponseBody ResponseEntity<Match> play(@PathVariable("id") Integer id, @RequestBody List<Position> body) {
        try {
            List<Match> matches = matchService.getMatches();
            Match findMatch = matchService.findMatch(id);
            List<Position> positions = body;

            if (findMatch == null) {
                return new ResponseEntity<Match>(HttpStatus.NOT_FOUND);
            }

            if (findMatch.getDone() == true) {
                return new ResponseEntity<Match>(HttpStatus.GONE);
            }

            Integer turns = findMatch.getTurns();

            if (turns < 8) {
                if (positions == null || positions.size() < 3) {
                    return new ResponseEntity<Match>(HttpStatus.BAD_REQUEST);
                }

                findMatch.setUserBoard(positions.get(0).getX(), positions.get(0).getY());
                findMatch.setUserBoard(positions.get(1).getX(), positions.get(1).getY());
                findMatch.setUserBoard(positions.get(2).getX(), positions.get(2).getY());
            } else {
                if (positions == null || positions.size() != 1) {
                    return new ResponseEntity<Match>(HttpStatus.BAD_REQUEST);
                }

                findMatch.setUserBoard(positions.get(0).getX(), positions.get(0).getY());
            }

            findMatch.setTurns(turns.intValue() + 1);

            Integer treasures = findMatch.getTreasures();

            if (treasures.intValue() == 3) {
                findMatch.setDone(true);
                scoreService.setMatch(findMatch);
            }

            return new ResponseEntity<Match>(findMatch, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/score")
    public ResponseEntity<List<Match>> getScore() {
        try {
            List<Match> matches = scoreService.getMatches();

            return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/a")
    public ResponseEntity<String> get() {
        try {
            return new ResponseEntity<String>("Guilherme", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
