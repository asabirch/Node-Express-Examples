onst express = require('express');
const app = express();

const { getElementById, getIndexById, updateElement,
    seedElements, createElement } = require('./utils');

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

let animals = [];
seedElements(animals, 'animals');

const expressionsRouter = require('./expressions.js');

app.use('/expressions', expressionsRouter);




// Update an expression


// Delete an expression
app.delete('/expressions/:id', (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if (expressionIndex !== -1) {
        expressions.splice(expressionIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

// Get all animals
app.get('/animals', (req, res, next) => {
    res.send(animals);
});

// Get a single animal


// Create an animal
app.post('/animals', (req, res, next) => {
    const receivedAnimal = createElement('animals', req.query);
    if (receivedAnimal) {
        animals.push(receivedAnimal);
        res.status(201).send(receivedAnimal);
    } else {
        res.status(400).send();
    }
});

// Update an animal
app.put('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        updateElement(req.params.id, req.query, animals);
        res.send(animals[animalIndex]);
    } else {
        res.status(404).send();
    }
});

// Delete a single animal
app.delete('/animals/:id', (req, res, next) => {
    const animalIndex = getIndexById(req.params.id, animals);
    if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});