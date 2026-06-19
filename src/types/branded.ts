export type Email = Brand<string, "email">;

export const isEmail = (input: string): input is Email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(input);
};
