import { render, screen, userEvent } from '@testing-library/react-native';
import ThemeSwitcher from '../ThemeSwitcher';


test('ThemeSwitcher Renders', async () => {

    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    expect(screen.getAllByRole('button')).toHaveLength(3);

  });