// Define types for chat messages
export type Message = {
  id: number;
  type: 'bot' | 'user' | 'image' | 'note' | 'processing';
  text?: string;
  imageUrl?: string;
};

export type ChatState = {
  messages: Message[];
  showVoucherChoices: boolean;
  showAccountCodeChoices: boolean;
  showConfirmation: boolean;
  inputValue: string;
};

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SHOW_VOUCHER_CHOICES' }
  | { type: 'SHOW_ACCOUNT_CODE_CHOICES' }
  | { type: 'SHOW_CONFIRMATION' }
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'RESET' };
