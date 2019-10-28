export class WrongCommandError extends Error {
	constructor(help: string) {
		super(`Неверная команда!\n\tПопробуйте: \n${help}`);
	}
}