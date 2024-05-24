const getMactchedUserInfo = (users: any, userLoggedIn: string | number) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat();
  return {
    id,
    ...(user as object),
  };
};

export default getMactchedUserInfo;
