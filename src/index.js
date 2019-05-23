import dva from 'dva';
import './index.css';

// 1. Initialize
let middlewares = []
const app = dva({
  //
  initialState: {
    products: [
      // {name: 'dva', id: 6},
      // {name: 'antd', id:3},
    ]
  },

  onAction: middlewares,
  onError: (err, dispatch) => {
    if (err.response) {
    }
  }
});


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
