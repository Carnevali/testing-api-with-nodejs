import app from './app';

app.listen(app.get('port'), () => {
  console.log(`App is running on port ${app.get('port')}`);
});
