export namespace BooleanHelper {
    export const isTrue = (value: any): boolean => {
        value = value + '';
        value = value.toLowerCase();
        return (
            value == 'true' ||
            value == '1' ||
            value == 'y' ||
            value == 'yes' ||
            value == 'ok'
        );
    }
}