/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-09-20 17:29:34
 */
export default class RoleScene {
    public scrollHeight: number;
    public scrollContainer: Element;

    constructor(
        public page: HTMLElement,
        param: { scrollHeight: number; scrollContainer: Element }
    ) {
        this.scrollHeight = param.scrollHeight;
        this.scrollContainer = param.scrollContainer;
        this.addContainerHeight();
    }

    addContainerHeight() {
        // if ($(this.scrollContainer).hasClass("_initScroll")) {
        //     $(this.scrollContainer).css({
        //         height: () => {
        //             return (
        //                 ($(this.scrollContainer).height() || 0) +
        //                 this.scrollHeight
        //             );
        //         },
        //     });
        // } else {
        //     $(this.scrollContainer).addClass("_initScroll");
        // }
        $(this.scrollContainer).css({
            height: this.scrollHeight,
        });
    }
}
