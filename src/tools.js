export function getRandomIndex(list = []) {
    return parseInt(Math.random() * list.length + '');
}

export function getOneOf(list) {
    return list[getRandomIndex(list)];
}