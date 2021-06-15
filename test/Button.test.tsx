import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

// This below import is what gives us the "toBeInTheDocument" method
import '@testing-library/jest-dom/extend-expect';

// As we are using the Component Story Format we can import it from our
// previously written story.
import { SCButton as Button } from '../stories/Button.stories';

describe('Button', () => {
  //... our former test
  it('should call the onClick method when a user clicks on the button', () => {
    // mock out our OnClick function
    const mockClick = jest.fn();

    const { getByRole } = render(<Button text="test" onClick={mockClick} />);

    // we store a variable with the button element
    const buttonElement = getByRole('button');

    // Simulate a user clicking on the button
    fireEvent.click(buttonElement);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should have the right text color class name for variants', () => {
    // we extract the "rerender" method to test both variants
    const { getByRole, rerender } = render(<Button text="test" />);

    const buttonElement = getByRole('button', { name: 'test' });

    // if you recall, passing no variant, defaults to "default" variant.
    // this is a bit robust, but it serves to illustarte the point
    expect(buttonElement.classList.contains('text-white')).toBe(true);
    expect(buttonElement.classList.contains('text-red-700')).toBe(false);

    // render the other "warning" variant
    rerender(<Button text={'test'} variant="warning" />);

    // test the opposite of the above:
    expect(buttonElement.classList.contains('text-white')).toBe(false);
    expect(buttonElement.classList.contains('text-red-700')).toBe(true);
  });
});
