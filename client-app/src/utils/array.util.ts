
const moveItemToFirst = (arr: any[] | undefined | null, moveIdx: number) => {
    if (arr !== undefined && arr !== null &&
        arr?.length > 0 && arr?.length - 1 >= moveIdx
    ) {
        return [
            arr[moveIdx],
            ...arr.filter((_, idx) => idx !== moveIdx)
        ];
    }
    return null;
}

export {
    moveItemToFirst
}
