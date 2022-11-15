interface ConstructorType<T> {
	new (): T;
}

export class BuilderCommon<T> {
	public instance: T;

	constructor(constructorType: ConstructorType<T>) {
		this.instance = new constructorType();
	}

	build(): T {
		return this.instance;
	}
}
