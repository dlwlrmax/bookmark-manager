interface BOOKMARK {
    collection: string;
    _id?: string;
    title?: string;
    url?: string;
}

export const getUnique = (data: BOOKMARK[]) => {
    return data.map((item: BOOKMARK) => item.collection).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
};
