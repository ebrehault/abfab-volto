#!/usr/bin/env node

const fs = require('fs/promises');
const _fs = require('fs');
const axios = require('axios');
const path = require('path');
const svelte = require('svelte/compiler');

function get_param(name, defaultValue = '') {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 && process.argv.length > index + 1
    ? process.argv[index + 1]
    : defaultValue;
}

const args = process.argv.slice(2);
const localRoot = get_param('local-root', './node_modules');
const localRootPath = path.resolve(localRoot);
const localPath = get_param('path');
const targetRoot = get_param('target-root', '/node_modules');
const server = get_param('server', 'http://localhost:8080/Plone');
const username = get_param('username', 'admin');
const password = get_param('password', 'secret');
const svelteOnly = process.argv.includes('--svelteOnly');

const ABFAB_SERVER_ROOT = `${server}/~`;
const ABFAB_ROOT = '/++api++/~';
const SVELTE_IMPORTS = new RegExp(/from "(.+\/svelte(\/\w+){0,1})";/g);
const LIB_IMPORTS = new RegExp(
  /import (.+) from ['"]((?![.\/]|https?:\/\/).+)['"];/g,
);
const EXCLUDED_FILES = ['.DS_Store'];

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function compileSvelte(filePath) {
  if (_fs.lstatSync(filePath).isDirectory()) {
    _fs.readdirSync(filePath).forEach((content) => {
      const contentPath = path.join(filePath, content);
      compileSvelte(contentPath);
    });
  } else {
    if (path.extname(filePath) === '.svelte') {
      _fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`compiling ${filePath}`);
        const { js } = svelte.compile(data, {
          sveltePath: ABFAB_ROOT + '/node_modules/svelte',
          customElement: data.includes('<svelte:options tag='),
        });
        if (js.code) {
          const code = js.code
            .replace(SVELTE_IMPORTS, 'from "$1/index.mjs";')
            .replace(
              LIB_IMPORTS,
              'import $1 from "/++api++/~/node_modules/$2";',
            );
          _fs.writeFile(filePath + '.js', code, function (err) {
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    }
  }
}

const uploadFile = async (filePath) => {
  const bufferContent = await fs.readFile(filePath);
  const id = filePath.split('/').pop();
  const folderPath =
    ABFAB_SERVER_ROOT +
    filePath.replace(localRootPath, targetRoot).replace(`/${id}`, '');
  try {
    const res = await axios.post(
      folderPath,
      JSON.stringify({
        id,
        file: bufferContent.toString(),
      }),
      {
        headers: { 'content-type': 'application/json' },
        auth: {
          username,
          password,
        },
      },
    );
    console.log(res.status, res.data);
    // don't go to fast, so we do not get a BTree ConflictError
    await sleep(500);
    return res;
  } catch (error) {
    console.log(filePath, error.response.status, error.response);
  }
};

const uploadFolder = async (folderPath) => {
  const list = await fs.readdir(folderPath);
  for (let i = 0; i < list.length; i++) {
    const filePath = path.resolve(folderPath, list[i]);
    const isDir = (await fs.stat(filePath)).isDirectory();
    if (isDir) {
      await uploadFolder(filePath);
    } else {
      if (
        (!svelteOnly ||
          filePath.endsWith('.svelte') ||
          filePath.endsWith('.js')) &&
        !filePath.endsWith('.d.ts') &&
        !EXCLUDED_FILES.includes(list[i])
      ) {
        console.log(filePath);
        await uploadFile(filePath);
      }
    }
  }
};

const folderPath = path.resolve(localRootPath, localPath);
if (_fs.lstatSync(folderPath).isDirectory()) {
  console.log('Compiling Svelte files in', folderPath);
  compileSvelte(folderPath);
  console.log('Uploading files from', folderPath);
  uploadFolder(folderPath);
} else {
  console.log(folderPath);
  uploadFile(folderPath);
}
