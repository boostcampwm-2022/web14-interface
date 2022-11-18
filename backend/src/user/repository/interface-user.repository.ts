import { UserInfo } from 'src/types/auth.type';

export interface UserRepository {
	/**
	 * 유저 엔티티를 DB에 저장하는 메서드입니다.
	 * @param user user entity
	 */
	saveUser(user: UserInfo): Promise<any>;

	/**
	 * 유저 id로 유저 엔티디를 반환합니다.
	 * @param id user의 id
	 */
	findUserById(id: string): Promise<any>;

	/**
	 * 모든 유저의 엔티티 배열을 반환합니다.
	 */
	findAllUser(): Promise<any[]>;
}
