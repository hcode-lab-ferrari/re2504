export function getOnlyNumbers(value: string) {
    // return String(value.match(/\d/g)?.join(""));
    // return String(value.replaceAll(/\D/g, ''));
    return String(value.replaceAll(/[^\d]/g, ''));
}