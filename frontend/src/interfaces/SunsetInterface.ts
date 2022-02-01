export interface ISunset {
    result: string,
    message: string,
    data: {
        userId: string,
        description: string,
        sunsetImage: string,
        createdAt: Date,
        updatedAt: Date,
    }
}

export interface IShareSunsetInfo {
    userId: string,
    description: string,
    sunsetImage: Blob,
}