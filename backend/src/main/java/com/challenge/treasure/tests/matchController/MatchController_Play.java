package com.challenge.treasure.tests.matchController;

import com.challenge.treasure.MatchController;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MatchController.class)
@ComponentScan("com")
public class MatchController_Play {
    private String name = "Guilherme";

    private ObjectMapper objectMapper = new ObjectMapper();

    private Object userNameObject = new Object() {
        public final String userName = name;
    };

    @Autowired
    private MockMvc mvc;

    @Test
    public void testPlayBoardBadRequest() throws Exception {
        mvc.perform(post("/board/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("")
                .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testPlayBoardNotFound() throws Exception {
        List<Position> positions = new ArrayList<Position>();

        positions.add(new Position(0, 1));
        positions.add(new Position(2, 3));

        String body = objectMapper.writeValueAsString(positions);

        mvc.perform(post("/board")
                .contentType(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)
                .characterEncoding("utf-8"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testPlayBoardSuccess() throws Exception {
        List<Position> positions = new ArrayList<Position>();

        positions.add(new Position(0, 1));
        positions.add(new Position(2, 3));
        positions.add(new Position(4, 1));

        String newGameBody = objectMapper.writeValueAsString(userNameObject);
        String playBody = objectMapper.writeValueAsString(positions);

        MvcResult newGameResponse = mvc.perform(post("/new-game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newGameBody)
                .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andReturn();

        Integer matchHash = JsonPath.read(newGameResponse.getResponse().getContentAsString(), "$.matchHash");

        MvcResult playResponse = mvc.perform(post("/board/" + matchHash)
                .contentType(MediaType.APPLICATION_JSON)
                .content(playBody)
                .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = playResponse.getResponse().getContentAsString();
        String userName = JsonPath.read(responseBody, "$.userName");
        Integer turns = JsonPath.read(responseBody, "$.turns");
        Integer treasures = JsonPath.read(responseBody, "$.treasures");
        Boolean done = JsonPath.read(responseBody, "$.done");

        assertEquals(name, userName);
        assertEquals(1, turns);
        assertEquals(3, treasures);
        assertEquals(true, done);
    }
}