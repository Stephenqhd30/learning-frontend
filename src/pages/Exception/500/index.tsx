import { Link } from '@umijs/max';
import { Button, Result } from 'antd';

/**
 * 500页面
 */
export default () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
