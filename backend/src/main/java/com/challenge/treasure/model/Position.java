package com.challenge.treasure.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Position {
    @JsonProperty("x")
    private Integer x;

    @JsonProperty("y")
    private Integer y;

    public Position(Integer x, Integer y) {
        this.x = x;
        this.y = y;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) { this.x = x; }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) { this.y = y; }
}
