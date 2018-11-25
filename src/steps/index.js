import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Step from "./Step"
import "./index.css";
const ThemeContext = React.createContext('light');
class Steps extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            children: null
        }
    }
    static defaultProps = {
        initial: 0,
        // current:18,
        status: "warn"
    }
    static propTypes = {
        initial: PropTypes.number,//起始序号，从 0 开始记数
        current: PropTypes.number,//指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态
        status: PropTypes.string,   //指定当前步骤的状态，可选warn wait process finish error 
        // userid: PropTypes.number.isRequired
    }
    componentWillMount() {
        let { children } = this.props;
        this.setState({
            children,
        })
    }
    render() {
        // console.log(333, this.props)
        return (
            <div className="ant-steps">
                <ThemeContext.Provider value={{ ...this.props }}>
                    {this.state.children}
                </ThemeContext.Provider>
            </div>
        )
    }
}
// Steps.Step =Step
Steps.Step = class Step extends Steps {
    constructor(props) {
        super(props);
        this.state = {
        }
        // console.log("2222", props)
    }
    static defaultProps = {
        description: "描述信息",
        title: "标题",
        stateInfo: "状态信息",
        status: ""
    }
    static propTypes = {
        description: PropTypes.string,//步骤的详情描述，可选	string|ReactNode
        title: PropTypes.string, //标题	string|ReactNode	
        status: PropTypes.string, //指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error
        stateInfo: PropTypes.string //步骤状态提示信息
    }
    componentWillMount() {
        let { description, title, stateInfo, status } = this.props;
        if (status) {
            this.setState({
                status,
                description,
                title,
                stateInfo,
            })
        } else {
            this.setState({
                status,
                description,
                title,
                stateInfo,
            })
        }
    }
    renderContent(value) {
        let { description, title, stateInfo, icon, status } = this.state;
        value.children.map((v, i) => {
            if (this.props === v.props) {
                this.ind = i + 1;
            }
        });
        if (!status) {
            if (this.ind == value.current && value.status) {
                status = value.status
            }
        }

        if (stateInfo == "已完成") { stateInfo = "已完成--"; };
        let wrapClassname = "";
        switch (status) {//wait process finish error
            case "wait": wrapClassname = "ant-steps-item-wait"; break;
            case "process": wrapClassname = "ant-steps-item-process"; break;
            case "finish": wrapClassname = "ant-steps-item-finish"; break;
            case "error": wrapClassname = "ant-steps-item-error"; break;
            case "warn": wrapClassname = "ant-steps-item-warn"; break;
            default: break;
        }
        // console.log(108, this.props, value, title);
        return <div className={"ant-steps-item " + wrapClassname}>
            <div className="ant-steps-item-header">
                <p className="ant-steps-item-txt">
                    <span className="ant-steps-icon">{this.ind ? this.ind : ""}</span>
                    <span className="ant-steps-item-title">{title}</span>
                </p>
                <span className="ant-steps-item-stateInfo" >{stateInfo}</span>

            </div>
            <div className="ant-steps-item-description">{description}</div>
        </div>
    }
    render() {
        return <ThemeContext.Consumer>
            {this.renderContent.bind(this) /* render something based on the context value */}
        </ThemeContext.Consumer>
    }
}
// Steps.Step.defaultProps = {
//     description: "描述信息",
//     title: "标题",
// }
// Steps.Step.propTypes = {
//     description: PropTypes.string,//步骤的详情描述，可选	string|ReactNode
//     title: PropTypes.string, //标题	string|ReactNode	
//     status: PropTypes.string, //指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error
// }

export default Steps