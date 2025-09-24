const dotenv = require('dotenv');
const app = require('./src/app');
const connectDB = require('./src/config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

async function start() {
  try {
    await connectDB(MONGODB_URI);
    console.log('DB연결이 완료되었습니다.');

    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  } catch (error) {
    process.exit(1);
  }
}

start();
