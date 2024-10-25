export default [
  { path: '/', redirect: '/my/certificate' },
  {
    path: '/my/certificate',
    name: '我的证书',
    icon: 'SafetyCertificateOutlined',
    component: './MyCertificate',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '用户登录', path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { name: '用户管理', path: '/admin/user', component: './Admin/UserList' },
      { name: '证书管理', path: '/admin/certificate', component: './Admin/CertificateList' },
      {
        name: '用户证书管理',
        path: '/admin/user/certificate',
        component: './Admin/UserCertificateList',
      },
      {
        name: '课程管理',
        path: '/admin/course',
        component: './Admin/CourseList',
      },
      {
        name: '用户课程管理',
        path: '/admin/user/course',
        component: './Admin/UserCourseList',
      },
      {
        name: '打印证书日志',
        path: '/admin/print/certificate',
        component: './Admin/LogPrintCertificateList',
      },
    ],
  },
  {
    path: '/review',
    name: '审核信息页',
    access: 'canAdmin',
    icon: 'UnorderedListOutlined',
    routes: [
      { path: '/review', redirect: '/review/certificate' },
      { path: '/review/certificate', name: '证书审核', component: './CertificateReview' },
    ],
  },
  {
    path: '/create/certificate',
    name: '制作证书',
    icon: 'DiffOutlined',
    component: './CreateCertificate',
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'user',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', path: '/account/center', component: './Account/Center' },
      { name: '个人设置', path: '/account/settings', component: './Account/Settings' },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
