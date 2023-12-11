import exress from 'express';
import { courseRoute } from './app/module/Course/course.route';
import cors from 'cors'
const app = exress();
app.use(exress.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', courseRoute)

export default app;
