import { requestStatusCheck } from "utils/httpErrors";

describe("UTILS - Http Errors", () => {
  it("Http Errors - Test if 'requestStatusCheck' works correctly", async (done) => {
    const fakeApiReturn = [
      { data: { name: "John Doe" }, status: 200 },
      { data: "Bad Request", status: 400 },
      { data: "Not Found", status: 404 },
      { data: "Internal Error", status: 500 },
      { data: "Invalid Data", status: 1000 }, // Invalid Call
    ];

    fakeApiReturn.forEach((apiData) => {
      const { data, status, error } = requestStatusCheck(apiData);

      expect(data).toBe(apiData.data);
      expect(status).toBe(apiData.status);
      if (apiData.status >= 300) {
        expect(error).toBeTruthy();
      } else {
        console.log(apiData.status);
        expect(error).toBeFalsy();
      }
    });

    done();
  });
});
