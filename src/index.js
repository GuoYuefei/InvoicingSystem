/**
* @description 
* @author Solomon
* @license MIT
* @created 2019-04-29T11:40:56 Z+08:00
* @last_modified 2019-05-28T16:54:32 Z+08:00
* 
* @flow 
*/

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
app.model(require("./models/contentIndex").contentIndex)
app.model(require("./models/ticketRecordM").ticketRecordM)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
