import React, { Component } from 'react';
import Steps from './steps/index';
import './App.css';
let { Step } = Steps

class App extends Component {
  constructor() {
    super();
    this.state = {
      current: 1
    }
  }
  prevBtn() {
    let { current } = this.state;
    if (current > 1) {
      current--;
    }
    this.setState({
      current
    })
  }
  nextBtn() {
    let { current } = this.state;
    current++;
    this.setState({
      current
    })
  }
  render() {
    let { current } = this.state;
    return (
      <div className="App">
        <h3>封装steps进度条</h3>
        <section>
          <div className="header">
            <Steps current={current} status="process">
              <Step title="Finished" description="This is a description1 This is a description1 This is a description1" stateInfo="已完成" icon={1} />
              <Step title="error" description="This is a description2" stateInfo="信息有误" icon={2} />
              <Step status="error" title="Waiting" description="This is a description3" stateInfo="审核中" icon={3} />
              <Step title="In Process" description="This is a description3" stateInfo="未通过" icon={4} />
            </Steps>
          </div>
          <div className="footer">
            <br />
            <hr />
            <br />
            <button onClick={this.prevBtn.bind(this)}> 上一步 </button>
            <button onClick={this.nextBtn.bind(this)}> 下一步 </button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
