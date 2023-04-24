export type BoardType = {
    id: number;
    writer: string;
    title: string;
    mainText: string;
    editDate: string;
    createDate: string;
    comments: CommentType[];
};

export type CommentType = {
    id: number;
    writer: string;
    text: string;
};

export type GetBoardType = {
    boardLength: number;
    boardData: BoardType[];
};

export type ArticleType = {
    title: string;
    mainText: string;
};

export type PutBoardType = {
    article: ArticleType;
    articleId: number;
};
