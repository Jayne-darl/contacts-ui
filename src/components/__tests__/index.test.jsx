import { render } from '@testing-library/react';
import Home from '../home';

jest.mock('../mobileHome', () => jest.fn().mockResolvedValue(null));

describe('<Home />', () => {
  it('renders correctly', () => {
    const wrapper = render(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
