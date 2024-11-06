export const toTitleCase = (str) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export const statusColors = {
  Pending: "bg-yellow",
  Completed: "bg-green",
  Cancelled: "bg-red",
};
