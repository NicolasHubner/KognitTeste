export function capitalizeFirstLetter(str: string) {
    if (str.length === 0) {
        return str;
    }

    const [firstLetter, ...restOfString] = str;
    return firstLetter.toUpperCase() + restOfString.join('');
}
