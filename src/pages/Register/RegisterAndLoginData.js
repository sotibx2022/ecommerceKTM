export const loginData = [
  {
    type: "email",
    name: "email",
    placeholder: "eg..pasangRaj124@gmail.com",
    label: "Email",
    required: true,
    errorMessage:"This Field is required with valid Email!"
  },
  {
    type: "password",
    name: "password",
    placeholder: "eg...APze@2598",
    label: "Password",
    required: true,
    errorMessage:"This Field is required with Valid Password!"
  },
];


export const registerData = [
    {
      label: "Display Name:",
      type: "text",
      name: "displayName",
      placeholder: "e.g. John Doe",
      required: true,
      errorMessage: "Please enter your display name.",
    },
    {
      label: "Email:",
      type: "email",
      name: "email",
      placeholder: "e.g. johndoe@example.com",
      required: true,
      errorMessage: "Please enter a valid email address.",
    },
    {
      label: "Password:",
      type: "password",
      name: "password",
      placeholder: "e.g. Password123",
      required: true,
      errorMessage: "Please enter a password.",
    },
    {
      label: "Confirm Password:",
      type: "password",
      name: "confirmPassword",
      placeholder: "e.g. Password123",
      required: true,
      errorMessage: "Please confirm your password.",
    },
  ];
