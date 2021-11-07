const decorate = ([node, path]: any, decoratoins:any[]) => {
    var ranges: any = []
    decoratoins.map((i: any) => {
        i([node, path, ranges])
    });
    return ranges;
};

export default decorate