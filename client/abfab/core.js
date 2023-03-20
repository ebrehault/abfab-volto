import { writable } from '/++api++/~/node_modules/svelte/store/index.mjs';

export const AbFabStore = writable({
  path: '',
  query: location.search,
  logged: true, //TO BE FIXED, check the cookie
  _navigateTo: '',
});

let redirecting = false;

export function redirectToLogin() {
  if (!redirecting) {
    // TODO: not relevant
    localStorage.removeItem('auth');
    // TODO: use Volto router?
    location.href = `/login?return_url=${window.location.pathname}`;
    redirecting = true;
  }
}
export function navigateTo(path) {
  AbFabStore.update((state) => ({ ...state, _navigateTo: getRealPath(path) }));
}

const NAV_ROOT = '/++api++/~/';
const REAL_PATH_RE = new RegExp(`.+${NAV_ROOT.replaceAll('+', '\\+')}(.+)`);
export function getRealPath(path) {
  return path.startsWith('/') && !path.startsWith(`${NAV_ROOT}`)
    ? `/++api++/~/${path.slice(1)}`
    : path.startsWith('http')
    ? path.replace(REAL_PATH_RE, '/++api++/~/$1')
    : path;
}

const CORE_PATH_RE = new RegExp(`${NAV_ROOT.replaceAll('+', '\\+')}(.+)`);
export function getCorePath(path) {
  return path.replace(CORE_PATH_RE, '/$1');
}
export const API = {
  getHeaders: (extraHeaders) => {
    // Plone auth is done with cookier (AFAIK)
    // const auth = { Authorization: 'Bearer ' + localStorage.getItem('auth') };
    const auth = {};
    return extraHeaders ? { ...auth, ...extraHeaders } : auth;
  },
  get: (path, extraHeaders) => {
    return API.fetch(path, extraHeaders);
  },
  head: (path, extraHeaders) => {
    return API.fetch(path, extraHeaders, { method: 'HEAD' });
  },
  post: (containerPath, data, extraHeaders) => {
    return API.fetch(containerPath, extraHeaders, {
      method: 'POST',
      body: data,
    });
  },
  patch: (path, data, extraHeaders) => {
    return API.fetch(path, extraHeaders, { method: 'PATCH', body: data });
  },
  delete: (path, extraHeaders) => {
    return API.fetch(path, extraHeaders, { method: 'DELETE' });
  },
  fetch: (path, extraHeaders, params = {}) => {
    params.headers = API.getHeaders(extraHeaders);
    return fetch(path, params).then((res) => {
      if (res.status === 401) {
        const token = localStorage.getItem('auth');
        if (token) {
          return fetch('/++api++/@login-renew', {
            method: 'POST',
            headers: API.getHeaders({}),
          })
            .then((auth) => {
              if (auth.status === 200) {
                return auth.json();
              } else {
                redirectToLogin();
              }
            })
            .then((data) => localStorage.setItem('auth', data.token))
            .then(() => fetch(path, params));
        } else {
          redirectToLogin();
        }
      } else {
        return res;
      }
    });
  },
};
const ANONYMOUS = 'Anonymous User';
const READER = 'guillotina.Reader';
export const Content = {
  get: async (path) => {
    const content = await API.get(getRealPath(path));
    return (await content.json()).data;
  },
  create: (path, id, data) => {
    const body = JSON.stringify({ id, '@type': 'Content', data });
    return API.post(getRealPath(path), body);
  },
  update: (path, data) => {
    return API.patch(
      getRealPath(path || location.pathname),
      JSON.stringify({ data }),
    );
  },
  delete: (path) => {
    return API.delete(getRealPath(path || location.pathname));
  },
  folderContents: async (path) => {
    const folder = await API.get(getRealPath(path) + '/@contents');
    return folder.json();
  },
  share: (path, setting) => {
    // setting: Allow, Deny, Unset
    const body = JSON.stringify({
      prinrole: [{ principal: ANONYMOUS, role: READER, setting }],
    });
    return API.post(getRealPath(path) + '/@sharing', body);
  },
  status: async (path) => {
    const sharing = await (
      await API.get(getRealPath(path) + '/@sharing')
    ).json();
    const localRole = sharing.local.prinrole[ANONYMOUS];
    if (!!localRole && !!localRole[READER]) {
      return { published: localRole[READER] === 'Allow', inherit: false };
    }
    const inherited = sharing.inherit.find(
      (item) =>
        !!item.prinrole[ANONYMOUS] && !!item.prinrole[ANONYMOUS][READER],
    );
    return {
      published:
        !!inherited && inherited.prinrole[ANONYMOUS][READER] === 'Allow',
      inherit: true,
    };
  },
};
