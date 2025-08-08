/**
 * 验证输入值是否为有效数字（验证失败时阻断后续逻辑）
 * @param value 原始输入值
 * @param errMsg 验证失败时的错误提示
 * @returns 有效数字（验证通过）| 永远不返回（验证失败，通过console.error提示并阻断）
 */
export const validateNumberInput = (value: unknown, errMsg: string): number => {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(errMsg); // 抛出错误中断执行
  }
  return num;
};
