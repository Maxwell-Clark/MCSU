import { render, screen, userEvent } from '@/test-utils';
import { ContactUs } from './ContactUs';

// Mock the ContactIconsList component
jest.mock('../ContactIcons/ContactIcons', () => ({
  ContactIconsList: () => <div data-testid="contact-icons-list">Contact Icons</div>,
}));

describe('ContactUs', () => {
  describe('Rendering', () => {
    it('renders contact information section', () => {
      render(<ContactUs />);
      expect(screen.getByText('Contact information')).toBeInTheDocument();
    });

    it('renders get in touch section', () => {
      render(<ContactUs />);
      expect(screen.getByText('Get in touch')).toBeInTheDocument();
    });

    it('renders ContactIconsList', () => {
      render(<ContactUs />);
      expect(screen.getByTestId('contact-icons-list')).toBeInTheDocument();
    });
  });

  describe('Form Fields', () => {
    it('renders name input field', () => {
      render(<ContactUs />);
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    });

    it('renders email input field', () => {
      render(<ContactUs />);
      const emailInput = screen.getByPlaceholderText('hello@mantine.dev');
      expect(emailInput).toBeInTheDocument();
    });

    it('renders subject input field', () => {
      render(<ContactUs />);
      const subjectInput = screen.getByPlaceholderText('Subject');
      expect(subjectInput).toBeInTheDocument();
    });

    it('renders message textarea', () => {
      render(<ContactUs />);
      expect(screen.getByPlaceholderText('Please include all relevant information')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<ContactUs />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('allows typing in name field', async () => {
      const user = userEvent.setup();
      render(<ContactUs />);

      const nameInput = screen.getByPlaceholderText('Your name');
      await user.type(nameInput, 'John Doe');

      expect(nameInput).toHaveValue('John Doe');
    });

    it('allows typing in email field', async () => {
      const user = userEvent.setup();
      render(<ContactUs />);

      const emailInput = screen.getByPlaceholderText('hello@mantine.dev');
      await user.type(emailInput, 'john@example.com');

      expect(emailInput).toHaveValue('john@example.com');
    });

    it('allows typing in subject field', async () => {
      const user = userEvent.setup();
      render(<ContactUs />);

      const subjectInput = screen.getByPlaceholderText('Subject');
      await user.type(subjectInput, 'Question about mindfulness');

      expect(subjectInput).toHaveValue('Question about mindfulness');
    });

    it('allows typing in message field', async () => {
      const user = userEvent.setup();
      render(<ContactUs />);

      const messageInput = screen.getByPlaceholderText('Please include all relevant information');
      await user.type(messageInput, 'Hello, I have a question...');

      expect(messageInput).toHaveValue('Hello, I have a question...');
    });
  });

  describe('Form Submission', () => {
    it('prevents default form submission', async () => {
      const user = userEvent.setup();
      render(<ContactUs />);

      const submitButton = screen.getByRole('button', { name: /send message/i });

      // Fill in required fields
      await user.type(screen.getByPlaceholderText('hello@mantine.dev'), 'test@example.com');
      await user.type(screen.getByPlaceholderText('Subject'), 'Test subject');

      // Click submit - the form should prevent default behavior
      await user.click(submitButton);

      // The form fields should still have their values
      expect(screen.getByPlaceholderText('hello@mantine.dev')).toHaveValue('test@example.com');
      expect(screen.getByPlaceholderText('Subject')).toHaveValue('Test subject');
    });

    it('submit button has correct type', () => {
      render(<ContactUs />);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Layout', () => {
    it('renders within a Paper component', () => {
      const { container } = render(<ContactUs />);
      // Paper component renders a div with shadow class
      expect(container.querySelector('.mantine-Paper-root')).toBeInTheDocument();
    });
  });
});
