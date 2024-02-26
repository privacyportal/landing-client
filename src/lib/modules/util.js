export const numberOrDefault = (number, defaultValue) => (Number.isNaN(number) ? defaultValue : number);
