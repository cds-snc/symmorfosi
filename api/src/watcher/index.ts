<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> formatting
import chokidar from "chokidar";
import queue from "async/queue";
import { saveFile } from "../db/save";
import { readFile } from "../db/readFile";
import { Event } from "../interfaces/Event";
<<<<<<< HEAD

const watchPath = process.env.CHECKS_PATH;

let counter: number = 0;

const globalQueue = queue(async (file, cb: () => {}) => {
  await saveFile(file);
  counter++;
  cb();
}, 1);
=======
import chokidar from 'chokidar'
import queue from 'async/queue'
import { saveFile } from '../db/save'
import { readFile } from '../db/readFile'
import { Event } from '../interfaces/Event'
=======
>>>>>>> formatting

const watchPath = process.env.CHECKS_PATH;

let counter: number = 0;

const globalQueue = queue(async (file, cb: () => {}) => {
<<<<<<< HEAD
  await saveFile(file)
  counter++
  cb()
}, 1)
>>>>>>> use chokidar
=======
  await saveFile(file);
  counter++;
  cb();
}, 1);
>>>>>>> formatting

// Define our watching parameters
const listener = (event: Event, path: string) => {
  switch (event) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> formatting
    case "add":
      console.log("The file", path, "was created");
      saveWatchedFile(path);
      break;
<<<<<<< HEAD
  }
};

export const saveWatchedFile = async (path: string) => {
  // "checks/0-1542896172725.json"
  const file = await readFile(path);
  const data = JSON.parse(file);
  globalQueue.push(data, () => {
    console.log(`finished processing ${path} ${counter}`);
  });
};

// looks for json files
// ignores .dotfiles
export const watchChecks = (): void => {
  chokidar
    .watch(`${watchPath}/*.json`, {
      ignored: [/(^|[\/\\])\../],
      ignoreInitial: true,
    })
    .on("all", listener);
};
=======
    case 'add':
      console.log('The file', path, 'was created')
      saveWatchedFile(path)
      break
=======
>>>>>>> formatting
  }
};

export const saveWatchedFile = async (path: string) => {
  // "checks/0-1542896172725.json"
  const file = await readFile(path);
  const data = JSON.parse(file);
  globalQueue.push(data, () => {
    console.log(`finished processing ${path} ${counter}`);
  });
};

export const watchChecks = (): void => {
<<<<<<< HEAD
  chokidar.watch(watchPath, {}).on('all', listener)
}
>>>>>>> use chokidar
=======
  chokidar.watch(watchPath, {}).on("all", listener);
};
>>>>>>> formatting
