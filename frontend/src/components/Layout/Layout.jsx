import { node, string } from 'prop-types';

import Header from '../Header/Header';

export function BaseLayout({ className, children, ...restProps }) {
  return (
    <div {...restProps}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

BaseLayout.defaultProps = {
  className: '',
};

BaseLayout.propTypes = {
  className: string,
  children: node,
};
