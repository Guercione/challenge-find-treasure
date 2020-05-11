import request from "./apiRequest";

export const gamePostNewGameApi = async ({ userName }) => {
  try {
    const { data, status } = await request.post("/new-game", {
      userName,
    });

    return { data: data, status: status };
  } catch (error) {
    return {
      data: error?.response?.data || "Internal Error",
      status: error?.response?.status || "Internal Error",
    };
  }
};

export const gamePostPlayApi = async ({ matchHash, positions }) => {
  try {
    const { data, status } = await request.post(
      "/board/" + matchHash,
      positions
    );

    return { data: data, status: status };
  } catch (error) {
    return {
      data: error?.response?.data || "Internal Error",
      status: error?.response?.status || "Internal Error",
    };
  }
};

export const gameGetGeneralScoreApi = async () => {
  try {
    const { data, status } = await request.get("/score");

    return { data: data, status: status };
  } catch (error) {
    return {
      data: error?.response?.data || "Internal Error",
      status: error?.response?.status || "Internal Error",
    };
  }
};
