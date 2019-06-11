// Global definitions for development

// For scss style loader
declare module '*.scss' {
    const styles: any;

    export = styles;
}

declare module '*.json' {
    const value: any;

    export default value;
}
