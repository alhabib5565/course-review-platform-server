import exress from 'express';
import { courseRoutes } from './app/module/Course/course.route';
import cors from 'cors'
import globlaErrorHandler from './app/middlewares/globalErrorHandler';
import { categoryRoutes } from './app/module/Category/category.route';
import { reviewRoutes } from './app/module/Review/review.route';
import { userRoutes } from './app/module/User/user.route';
const app = exress();
app.use(exress.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/users', userRoutes)

// global error handler 
app.use(globlaErrorHandler)
export default app;
