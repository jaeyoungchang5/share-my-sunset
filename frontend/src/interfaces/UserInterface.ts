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
    data: IUserMetaData[],
}

export interface IFriendRequests {
	result: string,
	message: string,
	data: IUserMetaData[],
}

export interface IUserMetaData {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
}

export interface ILoginCredentials {
    username: string,
    password: string,
}

export interface ISignupCredentials {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}