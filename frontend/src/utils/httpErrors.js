export const requestStatusCheck = (api, action = "server") => {
  const httpErrors = {
    200: { data: api.data, status: api.status, error: undefined },
    400: {
      data: api.data,
      status: api.status,
      error: "Some fields are missing",
    },
    404: {
      data: api.data,
      status: api.status,
      error: "No match found for this user",
    },
    500: {
      data: api.data,
      status: api.status,
      error: `Error on ${action} try again later`,
    },
    999: {
      data: api?.data,
      status: api?.status,
      error: `Unknow error, try again later`,
    },
  };

  return httpErrors[api.status] || httpErrors[999];
};
