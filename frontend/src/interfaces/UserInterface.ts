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