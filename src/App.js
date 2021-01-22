import React from 'react';
import Badge from "react-bootstrap/Badge";
let marked = require("marked");

const startString = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true
});

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

export default class App extends React.Component{

    constructor(props){
      super(props)
      this.state = {
        markdown: startString,
      };
    }


    updateMarkdown(markdown) {
      this.setState({ markdown });
    }

    handleReset = event => {
      event.preventDefault();    
        this.setState({ markdown: '' });
    }

render(){



   var inputBox = {
      width: "400px",
      height: "55vh",
      marginLeft: "auto",
      marginRight: "auto",
      padding:"10px"
    };

      var outputBox = {
      width: "400px",
      height: "55vh",
      backgroundColor: "#DCDCDC",
      marginLeft: "auto",
      marginRight: "auto",
      padding:"10px",
      overflowY: "auto"
    };


  return (
    <div className="App">
     <div className="container">

          <div className="row mt-4">
            <div className="col text-center">
              <h1>
                <Badge className="text-align-center" variant="light">
                 Markdown Previewer
                </Badge>
              </h1>
            </div>
          </div>

          <div className="row mt-4">
           <div className="col-md-6">
              <div className="col text-center">
                <h4>
                  <Badge className="text-align-center m-3" variant="secondary">
                    Editor
                  </Badge>
                </h4>
              </div>

              <div className="input" style={inputBox}>
                <textarea id="editor"
                  className="input"
                  style={inputBox}
                  value={this.state.markdown}
                  onChange={(e) => {
                    this.updateMarkdown(e.target.value);
                  }}
                >
                  
                </textarea>
              </div>   
            </div>

            <div className="col-md-6">
              <div className="col text-center">
                <h4>
                  <Badge  className="text-align-center m-3" variant="secondary">
                    Previewer
                  </Badge>
                </h4>
              </div>

              <div id="preview"
                style={outputBox}
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.markdown),
                }}
              ></div>
            </div>
          </div>


          <div className="row mt-4">
            <div className="col text-center">
              <button className="btn btn-primary" onClick={e => this.handleReset(e)}>Reset</button>
            </div>
          </div>

      </div>
    </div>
  );}
}