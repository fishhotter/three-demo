import * as React from "react";

import "./withLazyLoad.less";
import BaseSpin from './../BaseSpin/BaseSpin';

// function getDisplayName(component: React.ComponentType) {
//     return component.displayName || component.name || "Component"
// }

const withLazyLoad = (WrappedComponent: React.ComponentType<any>) => 
    class HOC extends React.Component {
        // private displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        public render() {
            const IBaseSpin: any = BaseSpin;
            
            return (
                <React.Suspense fallback={<div ><IBaseSpin /></div>} >
                    <WrappedComponent {...this.props} />
                </React.Suspense>
            )
        }
    }

export default withLazyLoad;