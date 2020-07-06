/**
 * remove null values from object
 * 
 * @param {object} args object from args
 * @returns object not contataining null
 */
const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
