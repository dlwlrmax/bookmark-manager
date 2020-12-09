export const getUnique = (data: any) => {
    return data.map((item: any) => item.collection).filter((value: string, index: number, self: any) => self.indexOf(value) === index);
};
