export const asyncHandler = (reqHandler) => async (req, res, next) => {
    try {
        await reqHandler(req, res, next);
    } catch (error) {
        next(error);
    }
}








/* This is a another way to handle ayncReq.
const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((error) => next(error));
    }
}
*/