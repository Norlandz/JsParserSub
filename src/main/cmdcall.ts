import { CommentRemoverJs } from './service/CommentRemoverJs.js';

import { Command } from 'commander';

// @knowlres: https://github.com/tj/commander.js
const program = new Command();

program //
  .name('codecommentremover')
  .description('Desc')
  .version('0.0.1');

// ;test; // pnpm cmdcall removecc sss --folderpath-removebase aaa --folderpath-removeoutput bbb
// ;test; program
// ;test;   .command('removecc')
// ;test;   .description('remove code comments in new folder. - the original folder will not be modified, a new folder is copied and modified on, only ts tsx files will be copied.')
// ;test;   .argument('<string>', 'Desc')
// ;test;   .requiredOption('--folderpath-removebase <string>', 'Desc')
// ;test;   .requiredOption('--folderpath-removeoutput <string>', 'Desc')
// ;test;   .action((str, options) => {
// ;test;     console.log(str);
// ;test;     console.log(options);
// ;test;     console.log(options.folderpathRemovebase);
// ;test;     console.log(options.folderpathRemoveoutput);
// ;test;     console.log(typeof options.folderpathRemoveoutput);
// ;test;   });

// pnpm cmdcall removecc --folderpath-removebase "H:/Using/TLightChat/tlightchat-main" --folderpath-removeoutput "H:/Using/TLightChat/tlightchat-main-out"
program
  .command('removecc')
  .description('remove code comments in new folder. - the original folder will not be modified, a new folder is copied and modified on, only ts tsx files will be copied.')
  .requiredOption('--folderpath-removebase <string>', 'Desc')
  .requiredOption('--folderpath-removeoutput <string>', 'Desc')
  .action((options) => {
    console.log(options.folderpathRemovebase);
    console.log(options.folderpathRemoveoutput);

    const folderPath_RemoveBase = options.folderpathRemovebase;
    const folderPath_RemoveOutput = options.folderpathRemoveoutput;
    const mode_recursiveForSubFolder = true;
    const mode_JustPrintOrActuallyWriteToFile = false; // true: just Print, no write to file
    const arr_FolderNameSub_Exclude = ['node_modules', '.vscode', '.git']; // exact match, not regex
    CommentRemoverJs.remove_Comment_inGiven_Folder(folderPath_RemoveBase, folderPath_RemoveOutput, mode_recursiveForSubFolder, mode_JustPrintOrActuallyWriteToFile, arr_FolderNameSub_Exclude);
  });

program.parse();

// seems some problem with \ path escape ..

// {
//   //   const folderPath_RemoveBase = './test/c01_simpleCase/res';
//   //   const folderPath_RemoveOutput = './test/c01_simpleCase/CommentRemoverJs-out';
//   // const folderPath_RemoveBase = '../TrafficSystemMockJs/TrafficSystemMockJs';
//   // const folderPath_RemoveOutput = '../TrafficSystemMockJs/TrafficSystemMockJs-CommentRemoverJs-out';
//   const folderPath_RemoveBase = '../TLightChat/tlightchat-main';
//   const folderPath_RemoveOutput = '../TLightChat/tlightchat-main-out';
//   const mode_recursiveForSubFolder = true;
//   const mode_JustPrintOrActuallyWriteToFile = false; // true: just Print, no write to file
//   const arr_FolderNameSub_Exclude = ['node_modules', '.vscode', '.git']; // exact match, not regex
//   CommentRemoverJs.remove_Comment_inGiven_Folder(folderPath_RemoveBase, folderPath_RemoveOutput, mode_recursiveForSubFolder, mode_JustPrintOrActuallyWriteToFile, arr_FolderNameSub_Exclude);
//
//   // problem facing
//   // 1. cannot work with js jsx cjs css scss file
//   // 1. need exclude node_modules
//   // 1. dist / test file can contain comment still ...
// }
