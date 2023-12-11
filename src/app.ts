import exress from 'express';
import { courseRoute } from './app/module/Course/course.route';
import cors from 'cors'
import globlaErrorHandler from './app/middlewares/globalErrorHandler';
const app = exress();
app.use(exress.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', courseRoute)

// global error handler 
app.use(globlaErrorHandler)
export default app;
