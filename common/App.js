import React from 'react';
import { DatePicker, message } from 'antd';
import 'antd/style/index.less';
import Header from './layout/Header.js';

const App = (props) => <div>
			<Header></Header>
			{props.children}
		</div>;

export default App;