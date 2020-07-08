seedElements(expressions, 'expressions');

expressionsRouter.get('/', (req, res, next) => {
    res.send(expressions);
});

module.exports = expressionsRouter;

