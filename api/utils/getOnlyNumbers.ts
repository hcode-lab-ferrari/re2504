export function getOnlyNumbers(value: string): string {
    return value ? String(value.toString().match(/\d/g)?.join('')) : '';
}
