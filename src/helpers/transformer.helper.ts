export function flatten(arr: any[]) {
  return arr.reduce((acc, val) => [...acc, ...val], []);
}

export function distinctByKey(arr: any[], key: string) {
  return [...new Map(arr.filter(item => item).map(item => [item[key], item])).values()];
}
