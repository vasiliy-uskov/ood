import {createInterface} from "readline";
import {Editor} from "./Editor";
import {CommandExecutor} from "./command/CommandExecutor";
import {createCommands} from "./command/CommandsCreator";

const editor = new Editor();
const commandExecutor = new CommandExecutor(createCommands(editor));
process.on('exit', () => editor.dispose());
createInterface({input: process.stdin})
	.on('line', (line) => commandExecutor.execute(line));
