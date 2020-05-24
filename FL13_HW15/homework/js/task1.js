function assign(current, ...rest) {
  rest.forEach((obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        current[key] = obj[key];
      }
    }
  });
  return current;
}
