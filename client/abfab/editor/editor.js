import {
  writable,
  derived,
  get,
} from '/++api++/~/node_modules/svelte/store/index.mjs';
import {
  getRealPath,
  getCorePath,
  API,
  redirectToLogin,
} from '/++api++/~/abfab/core.js';
import { compile } from '/++api++/~/node_modules/svelte/compiler.mjs';

const ABFAB_ROOT = '/++api++/~';
const SVELTE_RE = new RegExp(/from "(.+\/svelte(\/\w+){0,1})";/g);
const LIB_IMPORTS = new RegExp(
  /import (.+) from ['"]((?![.\/]|https?:\/\/).+)['"];/g,
);

export const EditorStore = writable({
  tree: [],
  showNavigation: true,
});

export const loadTree = async () => {
  const response = await API.get(`/++api++/abfab_tree`);
  if (response.ok) {
    const currentLocation = getCorePath(
      window.location.pathname.replace('/@edit', ''),
    );
    const tree = await response.json();
    const mapTree = (item, path) => {
      const isDirectory = !item.type && !item.path;
      if (isDirectory) {
        return {
          name: path.split('/').pop() || '/',
          type: 'Directory',
          path: getRealPath(path || '/'),
          children: Object.entries(item).map(([id, data]) =>
            mapTree(data, `${path}/${id}`),
          ),
          expanded: currentLocation.startsWith(path),
          selected: currentLocation === path,
        };
      } else {
        return {
          name: item.path.split('/').pop(),
          path: getRealPath(item.path),
          type: item.type,
          expanded: currentLocation.startsWith(item.path),
          selected: currentLocation === item.path,
        };
      }
    };
    const treeData = mapTree(tree['/'], '');
    EditorStore.update((state) => ({
      ...state,
      tree: [treeData],
    }));
  }
};

const _updateTreeItem = (item, target) => {
  if (item.path === target.path) {
    return target;
  } else if (target.path.startsWith(item.path)) {
    return {
      ...item,
      children: (item.children || [])
        .sort((a, b) => a.path.localeCompare(b.path))
        .map((child) => _updateTreeItem(child, target)),
    };
  } else {
    return item;
  }
};

export const updateTreeItem = (target) => {
  const tree = get(EditorStore).tree.map((i) => _updateTreeItem(i, target));
  EditorStore.update((state) => ({ ...state, tree }));
};

export const getTreeItem = (path, tree) => {
  if (!tree) {
    tree = get(EditorStore).tree;
  }
  const exactMatch = tree.find((item) => path === item.path);
  if (exactMatch) {
    return exactMatch;
  } else {
    const match = tree.find((item) =>
      path.startsWith(item.path.endsWith('/') ? item.path : `${item.path}/`),
    );
    if (!match) {
      return match;
    } else {
      return getTreeItem(path, match.children || []);
    }
  }
};

const deleteTreeItem = (path, tree) => {
  if (!tree) {
    tree = get(EditorStore).tree;
  }
  if (tree.find((item) => item.path === path)) {
    return tree.filter((item) => item.path !== path);
  } else if (tree.find((item) => path.startsWith(item.path))) {
    return tree.map((item) =>
      path.startsWith(item.path)
        ? { ...item, children: deleteTreeItem(path, item.children) }
        : item,
    );
  } else {
    return tree;
  }
};

const addTreeItem = (parentPath, newItem, tree) => {
  if (!tree) {
    tree = get(EditorStore).tree;
  }
  if (!parentPath) {
    tree.push(newItem);
    return tree;
  }
  const parent = tree.find((item) => item.path === parentPath);
  if (parent) {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newItem);
    parent.children.sort((a, b) => a.name.localeCompare(b.path));
    return tree.map((item) => (item.path === parentPath ? parent : item));
  } else if (tree.find((item) => parentPath.startsWith(item.path))) {
    return tree.map((item) =>
      parentPath.startsWith(item.path)
        ? {
            ...item,
            children: addTreeItem(parentPath, newItem, item.children || []),
          }
        : item,
    );
  } else {
    return tree;
  }
};

export const showNavigation = derived(
  EditorStore,
  (state) => state.showNavigation,
);

export async function saveFile(filepath, type, content) {
  const isSvelte = filepath.endsWith('.svelte');
  let error, warnings, js;
  if (isSvelte) {
    try {
      const result = compile(content, {
        sveltePath: ABFAB_ROOT + '/node_modules/svelte',
        customElement: content.includes('<' + 'svelte:options tag='),
      });
      js = result.js;
      warnings = result.warnings;
    } catch (e) {
      error = e;
    }
  }
  if (!error) {
    await _saveFile(filepath, type, content);
    if (isSvelte) {
      const jsFilePath = filepath + '.js';
      const code = js.code
        .replace(SVELTE_RE, 'from "$1/index.mjs";')
        .replace(LIB_IMPORTS, 'import $1 from "/++api++/~/node_modules/$2";');
      await _saveFile(jsFilePath, 'File', code);
    }
  }
  return { error, warnings: warnings || [] };
}

function _saveFile(filepath, type, content) {
  filepath = getRealPath(filepath);
  const path = filepath.split('/');
  const filename = path.pop();
  const container = path.join('/');
  return API.get(filepath).then((res) => {
    if (res.status === 401) {
      redirectToLogin();
    }
    const body = {
      '@type': type,
      id: filename,
    };
    if (content) {
      if (type === 'Content' || type === 'Directory') {
        body.data = JSON.parse(content);
      }
      if (type === 'File') {
        body.file = content;
      }
    }
    return res.status === 404
      ? API.post(container, JSON.stringify(body))
      : API.patch(filepath, JSON.stringify(body));
  });
}

export async function deleteFile(path) {
  const deletion = await API.delete(path);
  if (deletion.status === 204) {
    EditorStore.update((state) => ({ ...state, tree: deleteTreeItem(path) }));
  }
  if (path.endsWith('.svelte')) {
    await deleteFile(path + '.js');
  }
}

export async function addFile(containerPath, name, type, content) {
  containerPath = containerPath.endsWith('/')
    ? containerPath.slice(0, containerPath.length - 1)
    : containerPath;
  containerPath = getRealPath(containerPath);
  const path = `${containerPath}/${name}`;
  await saveFile(path, type, content);
  EditorStore.update((state) => ({
    ...state,
    tree: addTreeItem(containerPath, {
      name: path.split('/').pop(),
      path: path,
      type: type,
    }),
  }));
}
