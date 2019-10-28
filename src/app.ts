import {createInterface} from "readline";
import {Editor} from "./Editor";
import {CommandExecutor} from "./command/CommandExecutor";

const editor = new Editor();
const commandExecutor = new CommandExecutor(editor);
createInterface({input: process.stdin}).on('line', (line) => commandExecutor.execute(line));
process.on('exit', () => editor.dispose());