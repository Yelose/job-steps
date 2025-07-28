export type NoticeType = "info" | "warning" | "success" | "error"
export class NoticeModel {
    title?: string;
    subtitle?: string;
    notices?: string[];
    icon?: string;
    type?: NoticeType;

    constructor(init: Partial<NoticeModel>) {
        this.title = init.title;
        this.subtitle = init.subtitle;
        this.notices = init.notices;
        this.type = init.type ? init.type : 'info';
        this.icon = init.icon ? this.defaultIcon(this.type) : "info";
    }

    private defaultIcon(type: NoticeType): string {
        switch (type) {
            case 'info':
                return 'info';
            case 'warning':
                return 'warning';
            case 'success':
                return 'check_circle';
            case 'error':
                return 'error';
        }
    }
}
