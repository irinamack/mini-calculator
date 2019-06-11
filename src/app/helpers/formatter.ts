const NOT_DIGIT_REGEX = /[\D]+/g;

export const formatNumber = (value: number | string) => (value ? value.toString().replace(NOT_DIGIT_REGEX, '') : '');
