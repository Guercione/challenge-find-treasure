package com.challenge.treasure.service;

import com.challenge.treasure.model.Match;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service

public class MatchService {
    private List<Match> matches = new ArrayList<>();

    public List<Match> getMatches() {
        return matches;
    }

    public Match setMatch(String userName) {
        Match match = new Match(userName);
        matches.add(match);
        return match;
    }

    public Match findMatch(Number id) {
        Match findMatch = null;
        for (Match match : getMatches()) {
            if (match.getMatchHash().equals(id.intValue())) {
                findMatch = match;
                break;
            }
        }

        return findMatch;
    }


}
