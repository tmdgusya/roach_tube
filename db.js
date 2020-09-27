import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

//mongodb://ip:port/Database_name
mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: false
    }
);

const db = mongoose.connection;

// db 에 핸들링 처리함수들은 반드시 주석 처리 혹은 사용을 하여야 한다. 안그럼 appchrash 오류가 난다.
const handleopen = () => console.log("connect to DB"); // db connection handling
const handleError = (error) => console.log("error");

db.once("open", handleopen);
db.on("error", handleError);