export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    bio: string,
    privacyMode: number,
    friends: string[],
    friendRequests: string[],
    sunsets: string[],
}

export interface IPostIds {
    result: string,
    message: string,
    data: {
        _id: string
    }[]
}

export interface IFriends {
    result: string,
    message: string,
    data: {
        _id: string,
        friends: string[]
    }
}