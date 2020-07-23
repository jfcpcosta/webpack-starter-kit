export interface RouterOptions {
    mode?: RouterMode;
    root?: string;
}

export interface Route {
    path: string | RegExp;
    callback: Function;
}

export enum RouterMode {
    HISTORY = 'history',
    HASH = 'hash'
}

export default class Router {

    private routes: Route[] = [];
    private mode: string = null;
    private root: string = '/';

    private current: string;
    private interval: NodeJS.Timeout;

    constructor(options: RouterOptions) {
        this.mode = window.history.pushState ? RouterMode.HISTORY : RouterMode.HASH;

        if (options.mode) {
            this.mode = options.mode;
        }

        if (options.root) {
            this.root = options.root;
        }

        this.listen();
    }

    add(path: string | RegExp, callback: Function): Router {
        this.routes.push({ path, callback });
        return this;
    }

    remove(path: string): Router {
        const index = this.routes.findIndex((route: Route) => route.path === path);
        this.routes.slice(index, 1);
        return this;
    }

    flush(): Router {
        this.routes = [];
        return this;
    }

    clearSlashes(path: string) {
        return path
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '')
    }

    getFragment(): string {
        let fragment = '';

        if (this.mode === RouterMode.HISTORY) {
            fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }

        return this.clearSlashes(fragment);
    }

    navigate(path: string = ''): Router {
        if (this.mode === RouterMode.HISTORY) {
            window.history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
        }
        return this;
    }

    listen() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (this.current === this.getFragment()) {
                return;
            }
            this.current = this.getFragment();

            this.routes.some((route: Route) => {
                const match = this.current.match(route.path);
                if (match) {
                    match.shift();
                    route.callback.apply({}, match);
                    return match;
                }
                return false;
            });
        }, 50);
    }
}