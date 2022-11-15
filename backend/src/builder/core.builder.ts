interface ConstructorType<T> {
	new (): T;
}

class BuilderCommon<T> {
	public instance: T;

	constructor(constructorType: ConstructorType<T>) {
		this.instance = new constructorType();
	}

	build(): T {
		return this.instance;
	}
}
