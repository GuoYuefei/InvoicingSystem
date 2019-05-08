import dva from 'dva';
// bug dva还未解决使用browserHistory的bug 需要依赖第三方
// import { browserHistory } from 'dva/router'

// THINK 使用ts库中history可以解决这一问题
import { createBrowserHistory } from 'history';
import './index.css';

// 1. Initialize
const app = dva({
    history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
