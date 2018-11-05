import { Page } from './page';

export class Comic {
    public id: number;
    public name: string;
    public description: string;
    public is_public: boolean;
    public is_comments_active: boolean;
    public user_id: number;
    public created_at: Date;
    public updated_at: Date;
    public pages: Array<Page>;

    constructor() {
        this.pages = new Array<Page>();
    }
}