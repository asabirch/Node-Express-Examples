// Here we require in the 'events' module and save a reference to it in an events variable
let events = require('events');



// Here we create an instance of the EventEmitter class
let myEmitter = new events.EventEmitter();

let listenerCallback = (data) => {
    console.log(`Celebrate ${data}`);
}
// Here we subscribe to 'celebration' events and provide a callback function which will be passed the event's data

myEmitter.on('celebration', listenerCallback);
// Here we emit an event, we pass the event type, 'celebration', as the first argument, and the event data as the second
myEmitter.emit('celebration', 'good times, come on!');
