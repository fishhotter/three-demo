
import * as React from "react";


function withTable(WrappedComponent:React.ComponentType<any>) {
  return class HOC extends React.Component {
    public render() {
      return  <WrappedComponent {...this.props}>
          <div className="Table-header">
            {/* 我是标题 */}
          </div>
          <div className="Table-content">
            {/* 我是搜索体 */}
          </div>
        </WrappedComponent>
    }
  }
}


export default withTable;