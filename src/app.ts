import exress from 'express';

const app = exress();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
