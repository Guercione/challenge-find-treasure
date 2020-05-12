package com.challenge.treasure.Controller.Match;

import com.challenge.treasure.controller.MatchController;
import com.challenge.treasure.utils.Board;
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
import org.springframework.test.web.servlet.RequestBuilder;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MatchController.class)
@ComponentScan("com")
public class MatchController_Create {
    private String name = "Guilherme";

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mvc;
    @Test
    public void testCreateNewGameBadRequest() throws Exception {
        mvc.perform(post("/new-game")).andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateNewGameSuccess() throws Exception {
        Object object = new Object() {
            public final String userName = name;
        };

        String body = objectMapper.writeValueAsString(object);

        RequestBuilder request = post("/new-game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)
                .characterEncoding("utf-8");

        MvcResult response = mvc.perform(request).andReturn();
        Number responseStatus = response.getResponse().getStatus();
        String responseBody = response.getResponse().getContentAsString();

        Integer matchHash = JsonPath.read(responseBody, "$.matchHash");
        String userName = JsonPath.read(responseBody, "$.userName");
        Integer turns = JsonPath.read(responseBody, "$.turns");
        Integer treasures = JsonPath.read(responseBody, "$.treasures");
        Boolean done = JsonPath.read(responseBody, "$.done");
        ArrayList<ArrayList<Integer>> userBoard = JsonPath.read(responseBody, "$.userBoard");

        assertEquals(200, responseStatus);
        assertTrue(matchHash != null);
        assertEquals(name, userName);
        assertEquals(0, turns);
        assertEquals(0, treasures);
        assertEquals(false, done);
        assertEquals(new Board().generateInitialBoard(), userBoard);
    }
}