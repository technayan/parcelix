interface UpdateProfileProps {
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
}

export interface UpdateProfileDialogProps {
  user: UpdateProfileProps;
}

export interface UpdateProfileFormProps {
  user: UpdateProfileProps;
  onComplete?: () => void;
}
