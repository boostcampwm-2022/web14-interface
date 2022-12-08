export interface UserEntity {
	id: string;
	password: string;
	email: string;
	oauthType: string;
	createdAt: Date;
	updatedAt: Date;
	isDeleted: boolean;
}
