export const pubsub = {
  events: {},

  subscribe: function (eventName, functionName) {
    console.log(`PUBSUB: someone just subscribed to know about ${eventName}`);

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(functionName);
  },

  unsubscribe: function (eventName, functionName) {
    console.log(`PUBSUB: someone just UNsubscribed from ${eventName}`);

    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (eventFunction) => eventFunction !== functionName
      );
    }
  },

  publish: function (eventName, data) {
    console.log(`PUBSUB: Making an broadcast about ${eventName} with `, data);

    if (this.events[eventName]) {
      this.events[eventName].forEach((eventFunction) => eventFunction(data));
    }
  },
};
