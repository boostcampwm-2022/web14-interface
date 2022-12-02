export class BaseBuilder<T> {
	public instance: T;

	constructor(builder: new () => T) {
		this.instance = new builder();
	}

	build(): T {
		return this.instance;
	}
}
