package com.challenge.treasure.Controller.Match;

import com.challenge.treasure.controller.MatchController;
import com.challenge.treasure.model.Position;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MatchController.class)
@ComponentScan("com")
public class MatchController_Score {
    private String name = "Guilherme";

    private ObjectMapper objectMapper = new ObjectMapper();

    private Object userNameObject = new Object() {
        public final String userName = name;
    };

    @Autowired
    private MockMvc mvc;

    @Test
    public void testEmptyScore() throws Exception {
        mvc.perform(get("/score"))
                .andExpect(status().isOk())
                .andExpect(content().string("[]"));
    }

    @Test
    public void testScore() throws Exception {
        List<Position> positions = new ArrayList<Position>();

        positions.add(new Position(0, 1));
        positions.add(new Position(2, 3));
        positions.add(new Position(4, 1));

        String newGameBody = objectMapper.writeValueAsString(userNameObject);
        String playBody = objectMapper.writeValueAsString(positions);

        MvcResult res =  mvc.perform(post("/new-game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newGameBody)
                .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andReturn();

        Integer matchHash = JsonPath.read(res.getResponse().getContentAsString(), "$.matchHash");

        mvc.perform(post("/board/" + matchHash)
                .contentType(MediaType.APPLICATION_JSON)
                .content(playBody)
                .characterEncoding("utf-8"))
                .andExpect(status().isOk());

        MvcResult scoreResponse = mvc.perform(get("/score")).andExpect(status().isOk()).andReturn();

        assertEquals(true, scoreResponse.getResponse().getContentAsString().contains(matchHash.toString()));
    }
}