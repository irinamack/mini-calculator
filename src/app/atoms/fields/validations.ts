export const maxLength = (length: number) => (value: string) => {
    if (value && value.toString().length > length) {
        return `Must be less than ${length} symbols`;
    }

    return undefined;
};
