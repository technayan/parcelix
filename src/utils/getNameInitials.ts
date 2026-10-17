export const getNameInitials = (userName: string) => {
  if (!userName) return "";
  const initials = userName
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials;
};
