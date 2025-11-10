export function varAssign(data: string[]) {
  return {
    type: "var_assign",
    name: data[0],
    value: data[4],
  };
}

export function binExpr(type: string, data: string[]) {
  return {
    type,
    left: data[0],
    right: data[4],
  };
}
