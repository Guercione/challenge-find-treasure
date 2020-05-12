import {
  setMatch,
  getMatch,
  deletetMatch,
  getUserName,
  setUserName,
} from "utils/localStorage";

describe("UTILS - LocalStorage", () => {
  it("LocalStorage - Test if localSotrage functions works correctly", async (done) => {
    const fakeApiReturn = {
      matchHash: 733552022,
      userName: "Guilherme",
      turns: 1,
      treasures: 3,
      done: true,
      userBoard: [
        [0, 9, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 9, 0],
        [0, 0, 0, 0, 0],
        [0, 9, 0, 0, 0],
      ],
    };

    setMatch(fakeApiReturn);
    setUserName(fakeApiReturn.userName);

    expect(getMatch()).toMatchObject(fakeApiReturn);
    expect(getUserName()).toBe(fakeApiReturn.userName);

    deletetMatch();

    expect(getMatch()).toMatchObject({});

    done();
  });
});
