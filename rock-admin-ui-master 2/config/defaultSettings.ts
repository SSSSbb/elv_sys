import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#F5222D',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '电梯维保系统',
  pwa: false,
  logo: '/elv.jpg',
  iconfontUrl: '',
  menu: {
    locale: false,
  },
};

export default Settings;
