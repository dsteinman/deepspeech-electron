import React, {Component} from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			files: [],
			results: {}
		}
	}

	componentDidMount() {
		window.ipcRenderer.invoke('load-files').then(files => {
			console.log('files', files);
			this.setState({
				loading: false,
				files
			}, () => {
				files.forEach(file => {
					console.log('recognize', file);
					window.ipcRenderer.invoke('recognize-file', file).then(result => {
						console.log('result', result);
						const results = {...this.state.results};
						results[file] = result;
						this.setState({results});
					});
				})
			});
		});
	}

	render() {
		if (this.state.loading) return 'Loading...';
		return (<div className="App">
			<ul>
			{
				this.state.files.map((file, index) => {
					return (<li key={index}>
						{file} = {this.state.results[file] || '...'}
					</li>)
				})
			}
			</ul>
		</div>);
	}
}

export default App;
