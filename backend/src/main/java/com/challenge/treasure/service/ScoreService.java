package com.challenge.treasure.service;

import com.challenge.treasure.model.Match;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class ScoreService {
    private List<Match> matches = new ArrayList<>();

    public List<Match> getMatches() {
       Collections.sort(matches, new Comparator<Match>() {
            @Override
            public int compare(Match m1, Match m2) {
                return m1.getTurns().compareTo(m2.getTurns());
            }
        });

        if (matches.size() > 10) return matches.subList(0, 10);
        return matches;
    }

    public Match setMatch(Match match) {
        matches.add(match);
        return match;
    }

}
