import('./app.js').then(module => {
  // app.js is now loaded as a module
}).catch(err => {
  console.error('Failed to load app.js:', err);
});
