import ViewRender from '../core/view-render';

export class About {

    private parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    async render() {
        this.parent.innerHTML = await ViewRender.render('about');
    }
}