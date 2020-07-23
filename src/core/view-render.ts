import * as Mustache from 'mustache';

export default class ViewRender {

    static async render(name: string, data?: any): Promise<string> {
        const res = await fetch(`views/${name}.mustache`);
        const template = await res.text();

        return Mustache.render(template, data);
    }
}