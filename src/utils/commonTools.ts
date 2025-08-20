// 处理JSON.stringify()中的bigInt
export const processAuthResult = (result) => {
  return JSON.stringify(result, (key, value) =>
    typeof value === "bigint" ? Number(value) : value
  );
};
