// Tell ESLint to ignore the 'no-restricted-globals' rule for the next line
// eslint-disable-next-line no-restricted-globals
self.onmessage = (e: MessageEvent) => {
  if (e.data === 'calculate') {
    console.log('Worker received message, starting calculation...');
    let t = 0;
    for (let i = 0; i < 1e8; i++) {
      t += i;
    }
    // Also disable the rule for this line
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(t);
  }
};

export {};