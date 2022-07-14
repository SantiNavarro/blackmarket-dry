export const isValidEmail = (email: string): boolean => {
  return !!email.match(
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const isValidPassword = (password: string): boolean => password.length > 5;