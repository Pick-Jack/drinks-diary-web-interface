

export default class UnexpectedPlatformError extends Error {
    constructor(platform, component) {
        this.platform=platform
        this.component = component
        super(`Unexpected platform value: ${this.platform} in component ${this.component}`)
    }
}