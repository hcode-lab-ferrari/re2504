export function getOnlyNumbers(value: string) {
    return String(value.match(/\d/g)?.join(""));
}