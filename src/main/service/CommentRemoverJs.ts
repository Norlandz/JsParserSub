import ts from 'typescript';
import * as tsutils from 'ts-api-utils';
import fs from 'fs';
import path from 'path';

console.log('>---< CommentRemoverJs');

// /;test-learn; class T1 {@¦// /;test-learn;   static learn01() {@¦// /;test-learn;     // @main: https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler@¦// /;test-learn;@¦// /;test-learn;     // ;; const arr_fileName = ['./Vehicle.ts'];@¦// /;test-learn;     // ;; const fileName_M = 'Vehicle.ts';@¦// /;test-learn;     // @main: const program = ts.createProgram(['./src/index.ts'], {});@¦// /;test-learn;     // @main: https://marketsplash.com/tutorials/typescript/typescript-compiler/@¦// /;test-learn;     // ~~~// said need ex .. no_knowlres until only this -- need src ....... . dk res relll .....@¦// /;test-learn;     const fileName_M = './test/c01_simpleCase/res/Vehicle.ts';@¦// /;test-learn;@¦// /;test-learn;     const program = ts.createProgram([fileName_M], {@¦// /;test-learn;       // target: ts.ScriptTarget.ES2022,@¦// /;test-learn;       // module: ts.ModuleKind.CommonJS,@¦// /;test-learn;       removeComments: false,@¦// /;test-learn;     });@¦// /;test-learn;@¦// /;test-learn;     // ;; rip var@¦// /;test-learn;     // ;; for (const sourceFile_curr of program.getSourceFiles()) {@¦// /;test-learn;     // ;;   // console.log(sourceFile)@¦// /;test-learn;     // ;;   console.log(sourceFile_curr.fileName);@¦// /;test-learn;     // ;; }@¦// /;test-learn;     //@¦// /;test-learn;     // ;not_working; const emitResult = program.emit();@¦// /;test-learn;     // ;not_working; console.log(emitResult.emittedFiles)@¦// /;test-learn;     // ;not_working; for (const file_curr of emitResult.emittedFiles) {@¦// /;test-learn;     // ;not_working;   console.log(file_curr);@¦// /;test-learn;     // ;not_working; }@¦// /;test-learn;     // emm seems emitted ...@¦// /;test-learn;@¦// /;test-learn;     const sourceFile_M = program.getSourceFile(fileName_M);@¦// /;test-learn;     console.log(sourceFile_M.fileName);@¦// /;test-learn;     const fileContent_M = sourceFile_M.getFullText();@¦// /;test-learn;     console.log(fileContent_M.slice(0, 250));@¦// /;test-learn;@¦// /;test-learn;     {@¦// /;test-learn;       console.log('############');@¦// /;test-learn;       // ;; const r = ts.getLeadingCommentRanges('console.log(/* hello */ "world")', 12)@¦// /;test-learn;       // ;; console.log(r)@¦// /;test-learn;       // ;; https://github.com/microsoft/TypeScript/issues/54906@¦// /;test-learn;       //@¦// /;test-learn;       // []@¦// /;test-learn;       // `ts.getLeadingCommentRanges`@¦// /;test-learn;       // Given the source text and position within that text, returns ranges of comments between the first line break following the given position and the token itself (probably most useful with `ts.Node.getFullStart`).@¦// /;test-learn;       // <>@¦// /;test-learn;       // @main: https://basarat.gitbook.io/typescript/overview/ast/ast-trivia@¦// /;test-learn;       // ~~~// do need the ref ...@¦// /;test-learn;       // : design & wording is so confusing .....@¦// /;test-learn;@¦// /;test-learn;       const commentRanges = ts.getLeadingCommentRanges(fileContent_M, 0);@¦// /;test-learn;       console.log(commentRanges);@¦// /;test-learn;       if (commentRanges?.length) {@¦// /;test-learn;         const commentStrings: string[] = commentRanges.map((r) => fileContent_M.slice(r.pos, r.end));@¦// /;test-learn;         console.log(commentStrings);@¦// /;test-learn;       }@¦// /;test-learn;@¦// /;test-learn;       // console.log('############');@¦// /;test-learn;       // ts.forEachChild(sourceFile_M, printComment);@¦// /;test-learn;       //@¦// /;test-learn;       // function printComment(node: ts.Node) {@¦// /;test-learn;       //   const commentRanges = ts.getLeadingCommentRanges(fileContent_M, node.getFullStart());@¦// /;test-learn;       //   if (commentRanges?.length) {@¦// /;test-learn;       //     const commentStrings: string[] = commentRanges.map((r) => fileContent_M.slice(r.pos, r.end));@¦// /;test-learn;       //     console.log(commentStrings)@¦// /;test-learn;       //   }@¦// /;test-learn;       // }@¦// /;test-learn;@¦// /;test-learn;       // []@¦// /;test-learn;       // TypeScript does not provide an easy way to get all comments. You need to scan before and after each token (note: some tokens are not in the AST) using `ts.getLeadingCommentRanges` and `ts.getTrailingCommentRanges`. You also need to make sure to not scan inside template strings, JSDoc or JSX text (if applicable).@¦// /;test-learn;       //@¦// /;test-learn;       // My library `tsutils` provides some helper methods to deal with comments.@¦// /;test-learn;       // TSLint uses `tsutils.forEachComment` to iterate through all comments of the file.@¦// /;test-learn;       //@¦// /;test-learn;       // But there is actually a faster way, if performance matters for your use case:@¦// /;test-learn;       // Use a regular expression to scan for everything that looks like the comment you want to find, for example: `/\/\* tslint:disable \*\//g`.@¦// /;test-learn;       // For every match of this regexp you use `tsutils.isPositionInComment` or `tsutils.getCommentAtPosition` to check if this is really a comment and not the content of a (template) string, JSX text or a comment inside a comment.@¦// /;test-learn;       // As an example you can look at the implementation of finding such disable comments in my own linter: [https://github.com/ajafff/wotan/blob/d22eb11924daff2ec7f07ce09b77374469a71c97/src/line-switches.ts#L9-L16](https://github.com/ajafff/wotan/blob/d22eb11924daff2ec7f07ce09b77374469a71c97/src/line-switches.ts#L9-L16)@¦// /;test-learn;       //@¦// /;test-learn;       // On a related note: it's actually `tslint:disable`, not `tslint:disabled`@¦// /;test-learn;       // <>@¦// /;test-learn;       // https://github.com/Microsoft/TypeScript/issues/21049@¦// /;test-learn;@¦// /;test-learn;       // so the file indeed is a node emmm //guess@¦// /;test-learn;     }@¦// /;test-learn;@¦// /;test-learn;     {@¦// /;test-learn;       console.log('############');@¦// /;test-learn;       tsutils.forEachComment(sourceFile_M, (fileContentFull, commentRange_curr) => {@¦// /;test-learn;         console.log(fileContentFull.slice(commentRange_curr.pos, commentRange_curr.end) + ' :: ' + commentRange_curr);@¦// /;test-learn;       });@¦// /;test-learn;     }@¦// /;test-learn;   }@¦// /;test-learn;@¦// /;test-learn;   static test_ParentNode_isUndefined_in_forEachComment_in_canHaveTrailingTrivia() {@¦// /;test-learn;     // const fileContent = `@¦// /;test-learn;     // function App() {@¦// /;test-learn;     //   return <p></p>;@¦// /;test-learn;     // }@¦// /;test-learn;     // `;@¦// /;test-learn;     const fileContent = `// aaa@¦// /;test-learn;     function App() {@¦// /;test-learn;       return (@¦// /;test-learn;         <>@¦// /;test-learn;           <p>aaa</p>@¦// /;test-learn;           {/* <span>zzz</span> */}@¦// /;test-learn;           <p>bbb</p>@¦// /;test-learn;         </>@¦// /;test-learn;       );@¦// /;test-learn;     }@¦// /;test-learn;     `;@¦// /;test-learn;     const sourceFile = ts.createSourceFile('tmp.tsx', fileContent, ts.ScriptTarget.ES2015, true);@¦// /;test-learn;     // ;-; function ts.createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, setParentNodes?: boolean, scriptKind?: ts.ScriptKind): ts.SourceFile@¦// /;test-learn;     // ;-; indeed the setparentnode pb@¦// /;test-learn;     // ;-; []@¦// /;test-learn;     // ;-; 其中将 setParentNodes 设置为 true，那么每个节点会有父节点的信息，比较有用。@¦// /;test-learn;     // ;-; <>@¦// /;test-learn;     // ;-; https://juejin.cn/post/6844904177286512653@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; []@¦// /;test-learn;     // ;-; #### Type declaration@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; *   *   (fileName: string, sourceText: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes?: boolean, scriptKind?: ScriptKind): SourceFile@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-;     *   #### Parameters@¦// /;test-learn;     // ;-; <>@¦// /;test-learn;     // ;-; https://typestrong.org/ts-node/api/interfaces/TSCommon.html@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; []@¦// /;test-learn;     // ;-; As it turns out I was missing the fourth parameter in `ts.createSourceFile` called `setParentNodes`. By setting this parameter to true, I was able to use `addSyntheticLeadingComment`.@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; Basically this parameter (`setParentNodes`) sets each `Node`'s `parent` property.@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; `getOrCreateEmitNode` needs to traverse up the tree and cannot do so without parent references. For more detail on `setParentNodes`, check [this Github issue](https://github.com/microsoft/TypeScript/issues/14808)@¦// /;test-learn;     // ;-; <>@¦// /;test-learn;     // ;-; https://stackoverflow.com/questions/50008676/add-comment-before-function-using-typescript-compiler-api@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-;@¦// /;test-learn;     // ;-; []@¦// /;test-learn;     // ;-; Call `program.getTypeChecker()`. This set's the parent property on all nodes. The result can be ignored.@¦// /;test-learn;     // ;-; <>@¦// /;test-learn;     // ;-; https://github.com/microsoft/TypeScript/issues/14808@¦// /;test-learn;     // ;-;@¦// /;test-learn;@¦// /;test-learn;     let fileContent_CommentRemoved = fileContent;@¦// /;test-learn;     tsutils.forEachComment(sourceFile, (fileContentFull, commentRange_curr) => {@¦// /;test-learn;       // console.log(fileContentFull.slice(commentRange_curr.pos, commentRange_curr.end) + ' :: ' + commentRange_curr);@¦// /;test-learn;       fileContent_CommentRemoved = StringUtil.replaceSubString_RepeatSingleChar(fileContent_CommentRemoved, commentRange_curr.pos, commentRange_curr.end, ' ');@¦// /;test-learn;     });@¦// /;test-learn;     console.log(fileContent_CommentRemoved);@¦// /;test-learn;   }@¦// /;test-learn; }@¦// /;test-learn;@¦// /;test-learn; // T1.learn01();

class CommentRemoverJs {
  // []
  // When you're using `/g`, the regex object will save state between calls (since you should be using it to match over multiple calls). It matches once, but subsequent calls start from after the original match.
  // <>
  // https://stackoverflow.com/questions/2851308/why-does-my-javascript-regex-test-give-alternating-results
  // dk design
  private static regexMatchFor_FileName = /\.(ts|tsx)$/; // @atten: no global flag g in shared ref
  private static max_AmountFileToProcess = 100;

  public static remove_Comment_inGiven_Folder(
    folderPath_in: string,
    folderPath_out: string,
    mode_recursiveForSubFolder: boolean,
    mode_JustPrintOrActuallyWriteToFile: boolean,
    arr_FolderNameSub_Exclude: string[]
  ) {
    folderPath_in = path.normalize(folderPath_in);
    folderPath_out = path.normalize(folderPath_out);
    if (!fs.lstatSync(folderPath_in).isDirectory()) {
      throw new Error();
    }
    if (folderPath_in.toLowerCase() === folderPath_out.toLowerCase()) {
      // if (path.parse(folderPath_RemoveBase).base.toLowerCase() === this.folderName_out.toLowerCase()) { // emm 1. lowercase 1. more weird parsing or \ include 1. space include ...
      throw new Error('Input Output folder are same; otherwise (if proceed) ori file will be overwritten. (please dont use weird relative path, else this detection result may be wrong)');
    }

    let conetent_OverwrittenBackup = '';

    // https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
    // []
    // The behavior of the `recursive` option is not documented,
    // https://github.com/nodejs/node/issues/48640
    // const arr_file = fs.readdirSync(folderPath_in, { withFileTypes: true });
    const arr_fileDir = FsUtil.readDirSync_recursiveForSubFolder(folderPath_in, mode_recursiveForSubFolder, arr_FolderNameSub_Exclude);
    console.log(arr_fileDir);
    if (arr_fileDir.length > this.max_AmountFileToProcess) {
      throw new Error('Is the Path correct? there seems a lot of Files to Process');
    }
    for (const fileDir_curr of arr_fileDir) {
      // ;not_working; file_curr.path
      // const filePath_curr = folderPath_in + '/' + fileDir_curr.fs_dirent.name;
      console.log(`>> ${fileDir_curr.path} ${fileDir_curr.fs_dirent.name} ${fileDir_curr.fs_dirent.isFile()} ${Date.now()}`);
      if (fileDir_curr.fs_dirent.isFile() && this.regexMatchFor_FileName.test(fileDir_curr.fs_dirent.name)) {
        const fileContent_CommentRemoved = this.remove_Comment_inGiven_FilePath(fileDir_curr.path);
        // relative to , use for nested folder
        // just saying const scope is also a pb emm
        const pathRel = path.relative(folderPath_in, fileDir_curr.path);
        const filePath_curr_out = path.resolve(folderPath_out, pathRel);
        if (mode_JustPrintOrActuallyWriteToFile === true) {
          console.log(fileContent_CommentRemoved);
        } else {
          // https://stackoverflow.com/questions/34811222/writefile-no-such-file-or-directory
          const folder_ToHold = path.dirname(filePath_curr_out);
          if (!fs.existsSync(folder_ToHold)) {
            fs.mkdirSync(folder_ToHold, { recursive: true }); // need recursive, in the case of no file in a upper gap folder
          }
          if (fs.existsSync(filePath_curr_out)) {
            // console.error('filePath_curr_out already exists, will overwrite :: ' + filePath_curr_out + '\n' + 'Here is the content overwritten (for backup) :: ' + fs.readFileSync(filePath_curr_out, 'utf8').replaceAll(/\r\n|\r|\n/g, '@¦'));
            conetent_OverwrittenBackup +=
              '-------- filePath_curr_out already exists, will overwrite :: ' +
              filePath_curr_out +
              '\n' +
              'Here is the content overwritten (for backup) :: \n' +
              fs.readFileSync(filePath_curr_out, 'utf8').replaceAll(/\r\n|\r|\n/g, '@¦') +
              '\n';
          }
          fs.writeFileSync(filePath_curr_out, fileContent_CommentRemoved); // { flag: 'wx' }, // https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
          // aga how to throw when file exist at position?..
        }
        console.log('<<# ' + filePath_curr_out);
      }
    }

    if (conetent_OverwrittenBackup !== '') {
      console.error(conetent_OverwrittenBackup);
    }
  }

  public static remove_Comment_inGiven_FileCode(fileContent: string) {
    const sourceFile = ts.createSourceFile('tmp.tsx', fileContent, ts.ScriptTarget.ES2015, true);
    // need a way to throw if parse failed ... // TODO
    return this.remove_Comment_given_SourceFile(sourceFile, fileContent);
  }

  // feels string can do .. whatever ..
  private static remove_Comment_inGiven_FilePath(filePath: string) {
    const program = ts.createProgram([filePath], {
      // target: ts.ScriptTarget.ES2022,
      // module: ts.ModuleKind.CommonJS,
      removeComments: false,
    });

    program.getTypeChecker(); // <see ^^ [Call `program.getTypeChecker()`. This set's the parent property on all nodes. The result can be ignored.]>

    const sourceFile = program.getSourceFile(filePath);
    const fileContent = sourceFile.getFullText();
    // console.log('>>> ' + sourceFile.fileName);
    // console.log(fileContent.slice(0, 250));

    return this.remove_Comment_given_SourceFile(sourceFile, fileContent);
  }

  private static remove_Comment_given_SourceFile(sourceFile: ts.SourceFile, fileContent: string) {
    let fileContent_CommentRemoved = fileContent;
    // console.log(sourceFile.languageVariant === ts.LanguageVariant.JSX)
    tsutils.forEachComment(sourceFile, (fileContentFull, commentRange_curr) => {
      // console.log(fileContentFull.slice(commentRange_curr.pos, commentRange_curr.end) + ' :: ' + commentRange_curr);
      // fileContent_CommentRemoved = StringUtil.replaceSubString_RepeatSingleChar(fileContent_CommentRemoved, commentRange_curr.pos, commentRange_curr.end, ' ');
      // newline is turned into space too...
      fileContent_CommentRemoved = StringUtil.replaceSubString_Regex(fileContent_CommentRemoved, commentRange_curr.pos, commentRange_curr.end, /./g, ' ');
    });

    // console.log(fileContent_CommentRemoved.slice(0, 500));
    return fileContent_CommentRemoved;
  }

  // ;test; const __dirname = path.resolve();@¦  // ;test; console.log(__dirname);@¦  // ;test;@¦  // ;test; // https://nodejs.org/docs/latest/api/path.html#pathparsepath@¦  // ;test; // ~~~// just not much talk online, but only in offical doc .. should be k@¦  // ;test; // []@¦  // ;test; // I would say the name of `resolve` is not the most clear, `path.cd([starting dir], [final dir])` would be much more intuitive.@¦  // ;test; // <>@¦  // ;test; // https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join@¦  // ;test; // []@¦  // ;test; // Returns: <Object>@¦  // ;test; // <>@¦  // ;test; // https://nodejs.org/docs/latest/api/path.html#pathparsepath@¦  // ;test; // rip that ....@¦  // ;test;@¦  // ;test; const path_CommentRemoverJs_out = path.resolve(folderPath_RemoveBase, '..', 'out');@¦  // ;test;@¦  // ;test; const pathDivInfo = path.parse(folderPath_RemoveBase); // better use base .. cuz folder can have dot inside ... can it? ..@¦  // ;test; console.log(pathDivInfo);@¦  // ;test;@¦  // ;test; console.log(path_CommentRemoverJs_out);@¦  // ;test; console.log(fs.lstatSync(folderPath_RemoveBase).isDirectory());@¦  // ;test; // console.log(fs.lstatSync(path_CommentRemoverJs_out).isDirectory());@¦  // ;test;@¦  // ;test; console.log(path.relative('home/src/.././', 'home/dist/..') === '');@¦  // ;test; console.log(path.normalize('home/src/.././'));@¦  // ;test; // seems cannot abs paht -- unless join with dirname@¦  // ;test; // seems resolve gives abs path ...
}

class StringUtil {
  private static replaceSubString(content_All: string, startIndex: number, endIndex: number, str_Substitute_Sub: string) {
    return content_All.slice(0, startIndex) + str_Substitute_Sub + content_All.slice(endIndex);
  }

  private static replaceSubString_RepeatSingleChar(content_All: string, startIndex: number, endIndex: number, str_Substitute_RepeatSingleChar: string) {
    return content_All.slice(0, startIndex) + str_Substitute_RepeatSingleChar.repeat(endIndex - startIndex) + content_All.slice(endIndex);
  }

  public static replaceSubString_Regex(content_All: string, startIndex: number, endIndex: number, regexMatchFor: RegExp, regexSubstitute: string) {
    return content_All.slice(0, startIndex) + content_All.slice(startIndex, endIndex).replaceAll(regexMatchFor, regexSubstitute) + content_All.slice(endIndex);
  }

  // console.log(StringUtil.replaceSubString('123456789', 1,3, 'BC'));
  // console.log(StringUtil.replaceSubString_RepeatSingleChar('123456789', 1,3, ' '));
}

// seems js just cant provide the path , must use string -- DirentWithPath ...
class DirentWithPath {
  readonly fs_dirent: fs.Dirent;
  readonly path: string;

  constructor(fs_dirent: fs.Dirent, path: string) {
    this.fs_dirent = fs_dirent;
    this.path = path;
  }
}

class FsUtil {
  public static readDirSync_recursiveForSubFolder(folderPath_in: string, mode_recursiveForSubFolder: boolean, arr_FolderNameSub_Exclude: string[] = []) {
    // say checker and performance em
    folderPath_in = path.normalize(folderPath_in);
    if (!fs.lstatSync(folderPath_in).isDirectory()) {
      throw new Error();
    }
    for (const folderName_Exclude_curr of arr_FolderNameSub_Exclude) {
      if (/^\s|\s$/.test(folderName_Exclude_curr)) {
        throw new Error('FolderName should not contain Whitespace near the ends.');
      }
      if (/[^\w\-\+\.\,\(\)\[\]\; ]/.test(folderName_Exclude_curr)) {
        throw new Error('FolderName should not contain any special characters (Not_Supported).'); // said folder can contain dot ...
      }
    }
    return this.readDirSync_recursiveForSubFolder_recursive(folderPath_in, undefined, mode_recursiveForSubFolder, arr_FolderNameSub_Exclude);
  }

  private static readDirSync_recursiveForSubFolder_recursive(
    folderPath_in: string,
    arr_fileDir_All: DirentWithPath[] = [],
    mode_recursiveForSubFolder: boolean,
    arr_FolderNameSub_Exclude: string[] = []
  ) {
    for (const folderName_Exclude_curr of arr_FolderNameSub_Exclude) {
      if (path.parse(folderPath_in).base.toLowerCase() === folderName_Exclude_curr.toLowerCase()) {
        // compiler should now optimize...
        // skip this folder, if it should be excluded
        return arr_fileDir_All;
      }
    }

    const arr_fileDir = fs.readdirSync(folderPath_in, { withFileTypes: true });
    // arr_fileDir_All = arr_fileDir_All.concat(arr_file); // dk must new array obj .. // https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating#35223022
    // arr_fileDir_All.push(...arr_fileDir);
    for (const dirent_curr of arr_fileDir) {
      arr_fileDir_All.push(new DirentWithPath(dirent_curr, folderPath_in + '/' + dirent_curr.name));
    }
    for (const fileDir_curr of arr_fileDir) {
      const fileDirPath_curr = folderPath_in + '/' + fileDir_curr.name;
      // console.log(`>> ${filePath_curr} ${file_curr.path} ${file_curr.name} ${Date.now()}`);
      if (mode_recursiveForSubFolder === true) {
        if (fileDir_curr.isDirectory()) {
          this.readDirSync_recursiveForSubFolder_recursive(fileDirPath_curr, arr_fileDir_All, mode_recursiveForSubFolder, arr_FolderNameSub_Exclude);
        } else {
          // @do_nothing
          // if (file_curr.isFile()) {
          // } else if (file_curr.isSymbolicLink()) {
          //   // forgot, C, how deal with symbolic link , link to real or not, but this just need add to arr so ..
          // } else {
          //   // throw new TypeError('NotSupported');
          // }
        }
      }
    }

    return arr_fileDir_All;
  }
}

// {
//   //   const folderPath_RemoveBase = './test/c01_simpleCase/res';
//   //   const folderPath_RemoveOutput = './test/c01_simpleCase/CommentRemoverJs-out';
//   // const folderPath_RemoveBase = '../TrafficSystemMockJs/TrafficSystemMockJs';
//   // const folderPath_RemoveOutput = '../TrafficSystemMockJs/TrafficSystemMockJs-CommentRemoverJs-out';
//   const folderPath_RemoveBase = '../TLightChat/tlightchat-main';
//   const folderPath_RemoveOutput = '../TLightChat/tlightchat-main-preview';
//   const mode_recursiveForSubFolder = true;
//   const mode_JustPrintOrActuallyWriteToFile = false; // true: just Print, no write to file
//   const arr_FolderNameSub_Exclude = ['node_modules', '.vscode'];
//   CommentRemoverJs.remove_Comment_inGiven_Folder(folderPath_RemoveBase, folderPath_RemoveOutput, mode_recursiveForSubFolder, mode_JustPrintOrActuallyWriteToFile, arr_FolderNameSub_Exclude);
// 
//   // problem facing
//   // 1. cannot work with js jsx cjs css scss file
//   // 1. need exclude node_modules
//   // 1. dist / test file can contain comment still ...
// }
// 

export { CommentRemoverJs };
