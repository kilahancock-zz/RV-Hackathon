import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class HtmlComponent extends Component {
    render() {
        const html = this.props.body;
        return <div className="summary">{ReactHtmlParser(html)}</div>
    }
}

export default HtmlComponent;