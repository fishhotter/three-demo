// import * as React from "react";

import { InterRouteConfig } from './router.d';

// const BowSpuervisionPage = React.lazy(async () => import("pages/BowSpuervision/BowSpuervision"))


const asyncRouter: InterRouteConfig[] = [
  // {
  //   path: "/bowspuervision",
  //   name: "黑臭水体管理",
  //   exact: true,
  //   components: BowSpuervisionPage,
  //   show: true,
  //   children: [
  //     {
  //       path: "/bowspuervision/",
  //       name: "黑臭水体管理",
  //       exact: true,
  //       children: [],
  //       components: BowSpuervisionPage,
  //       show: false
  //     }, {
  //       path: "/bowspuervision/bowshow",
  //       name: "黑臭水体",
  //       exact: true,
  //       children: [],
  //       components: BowShowPage,
  //       show: true
  //     }, {
  //       path: "/bowspuervision/microbowshow",
  //       name: "小微黑臭水体",
  //       exact: true,
  //       components: MicroBowShowPage,
  //       children: [],

  //       show: true
  //     }, {
  //       path: "/bowspuervision/taskas",
  //       name: "监管任务关联",
  //       exact: true,
  //       components: TaskAsPage,
  //       children: [],
  //       show: true
  //     }
  //   ],
  //   icon: "icon-heichoushuitijianguan"
  // }
];

export default asyncRouter;