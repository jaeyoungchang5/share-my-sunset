export interface IFeedItem {
	_id: string,
	userId: string,
	sunsetImage: string,
	description: string,
	createdAt: string,
	updatedAt: string,
	__v: number
}

export interface IFeed {
	result: string,
	message: string,
	data: IFeedItem[]
}