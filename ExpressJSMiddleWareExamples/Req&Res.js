const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
    mystery: {
        number: 4
    },
    lemon: {
        number: 5
    },
    rootBeer: {
        number: 25
    },
    cherry: {
        number: 3
    },
    licorice: {
        number: 1
    }
};

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} Request Received`);
    next();
});

app.get('/beans/', (req, res, next) => {
    res.send(jellybeanBag);
    console.log('Response Sent');
});

app.post('/beans/', (req, res, next) => {
    let bodyData = '';
    req.on('data', (data) => {
        bodyData += data;
    });

    req.on('end', () => {
        const body = JSON.parse(bodyData);
        const beanName = body.name;
        if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
            return res.status(400).send('Bean with that name already exists!');
        }
        const numberOfBeans = Number(body.number) || 0;
        jellybeanBag[beanName] = {
            number: numberOfBeans
        };
        res.send(jellybeanBag[beanName]);
        console.log('Response Sent');
    });
});

app.get('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        console.log('Response Sent');
        return res.status(404).send('Bean with that name does not exist');
    }
    res.send(jellybeanBag[beanName]);
    console.log('Response Sent');
});

app.post('/beans/:beanName/add', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        return res.status(404).send('Bean with that name does not exist');
    }
    let bodyData = '';
    req.on('data', (data) => {
        bodyData += data;
    });

    req.on('end', () => {
        const numberOfBeans = Number(JSON.parse(bodyData).number) || 0;
        jellybeanBag[beanName].number += numberOfBeans;
        res.send(jellybeanBag[beanName]);
        console.log('Response Sent');
    });
});

app.post('/beans/:beanName/remove', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        return res.status(404).send('Bean with that name does not exist');
    }
    let bodyData = '';
    req.on('data', (data) => {
        bodyData += data;
    });

    req.on('end', () => {
        const numberOfBeans = Number(JSON.parse(bodyData).number) || 0;
        if (jellybeanBag[beanName].number < numberOfBeans) {
            return res.status(400).send('Not enough beans in the jar to remove!');
        }
        jellybeanBag[beanName].number -= numberOfBeans;
        res.send(jellybeanBag[beanName]);
        console.log('Response Sent');
    });
});

app.delete('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        return res.status(404).send('Bean with that name does not exist');
    }
    jellybeanBag[beanName] = null;
    res.status(204).send();
    console.log('Response Sent');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});